import React, { Fragment, useState, useEffect, useReducer } from "react";

const dataFetchReducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl: string, initialData: any) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false; // 阻止组件 unmounted 后还进行 state 变化操作
    const fetchData = () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = [{ objectID: 1, title: 111 }];
        !didCancel && dispatch({ type: "FETCH_SUCCESS", payload: result });
      } catch (error) {
        !didCancel && dispatch({ type: "FETCH_FAILURE" });
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};

const Reducer: React.FC = () => {
  const [query, setQuery] = useState("redux");
  const [{ data, isLoading, isError }, setUrl] = useDataApi(
    "https://hn.algolia.com/api/v1/search?query=redux",
    []
  );

  return (
    <Fragment>
      <form
        onSubmit={event => {
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.map((item: any) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default Reducer;
