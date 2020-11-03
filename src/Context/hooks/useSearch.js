import { useEffect, useState } from "react";
import axios from "axios";

import api from "../../services/api";

export default function useSearch(
  route,
  query,
  pageNumber,
  update,
  limit,
  afterGet = () => {}
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [content, setContent] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setContent([]);
  }, [query, update]);

  useEffect(() => {
    // console.log("Enviou o video");
    // console.log("query", query);
    // console.log("pageNumber", pageNumber);

    setLoading(true);
    setError(false);
    let cancel;

    api
      .get(route, {
        params: { query, pageNumber },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setContent((prevBooks) => [...new Set([...prevBooks, ...res.data])]);

        // console.log(res);
        // afterGet();

        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
        // afterGet();
      });
    return () => cancel();
  }, [query, pageNumber, update]);

  return { loading, error, content, setContent, hasMore };
}
