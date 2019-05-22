import { DataProxy } from 'apollo-cache';
import { useRef } from 'react';
import { OperationVariables } from 'react-apollo';
import {
  QueryHookOptions,
  QueryHookResult,
  useQuery,
} from 'react-apollo-hooks';

import { apolloClient } from 'services';

function getDefaultOptions() {
  const defaultOptions: QueryHookOptions<any> = {
    client: apolloClient,
  };

  return defaultOptions;
}

/**
 *
 * @param nextValue next value to be replaced - will be ingored if it's null or undefined
 * @param forceWrite replace current value even if its null or undefined
 */
function useOmitNulls<T>(nextValue: T, forceWrite: boolean) {
  const valueRef = useRef<T>(nextValue);

  function getShouldWrite() {
    if (forceWrite) {
      return true;
    }

    if ([null, undefined].includes(nextValue)) {
      return false;
    }

    return true;
  }

  if (getShouldWrite()) {
    valueRef.current = nextValue;
  }

  return valueRef.current;
}

export function createQueryHook<Data, Variables = OperationVariables>(
  query: any,
  defaultHookOptions: QueryHookOptions<Variables> = {},
) {
  const hookDefaultOptions = {
    ...getDefaultOptions(),
    ...defaultHookOptions,
  };

  if (!hookDefaultOptions.client) {
    throw new Error(`Client is required for createQueryHook`);
  }

  function useQueryHook(
    variables?: Variables,
    instanceOptions: QueryHookOptions<Variables> = {},
  ): QueryHookResult<Data, Variables> {
    const queryResult = useQuery<Data, Variables>(query, {
      ...hookDefaultOptions,
      ...instanceOptions,
      variables,
    });

    /**
     * normally - apollo sets data to null when data is loading. we want to avoid that.
     * if data is loading - ignore null values and return previously known value
     * if data is not loading - null might be meaningful - dont ignore it then
     */
    const dataWithNullsOmmited = useOmitNulls(
      queryResult.data,
      !queryResult.loading,
    );

    return {
      ...queryResult,
      data: dataWithNullsOmmited,
    };
  }

  function read(
    client: DataProxy,
    variables?: Variables,
    optimistic?: boolean,
  ) {
    return client.readQuery<Data, Variables>({ query, variables }, optimistic);
  }

  function write(
    client: DataProxy,
    { data, variables }: { variables?: Variables; data: Data },
  ) {
    client.writeQuery<Data, Variables>({
      query,
      data,
      variables,
    });
  }

  function update(
    client: DataProxy,
    recipe: (data: Data) => Data,
    variables?: Variables,
  ) {
    const currentData = read(client, variables);

    const newData = recipe(currentData);

    write(client, { data: newData, variables });
  }

  const manager = { read, write, update };

  return [useQueryHook, manager] as const;
}
