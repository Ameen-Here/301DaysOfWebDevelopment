import { useEffect } from "react";
import useHttp from "../components/hooks/use-http";
import { getAllQuotes } from "../components/lib/api";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NotFound from "./NotFound";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focus">{error}</p>;
  }

  if (status === "completed" && (!loadedQuote || loadedQuote.length === 0)) {
    return <NotFound />;
  }
  return <QuoteList quotes={loadedQuote} />;
};

export default AllQuotes;
