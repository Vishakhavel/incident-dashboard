// function to format date to a readable format
export const formatDate = ({ date, fallbackMessage }) => {
  if (!date) return fallbackMessage;
  new Date(date).toLocaleString();
};

// this function will be used if the API supports pagination.
// Not used in the project currently => not exporting
const fetchPageData = async ({
  currentPage,
  rowsPerPage,
  setApiData,
  setFilteredData,
  setLoading,
  setError,
}) => {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch(
      `https://rh871jxygg.execute-api.us-east-2.amazonaws.com/default/panw-incident-reponse?page=${currentPage}&pageSize=${rowsPerPage}`
    );

    const data = await response.json();

    setApiData((prev) => ({
      ...prev,
      [currentPage]: data,
    }));

    setFilteredData(data);
  } catch (err) {
    setError(err.message);
    setFilteredData([]);
    console.error("Error fetching paginated data:", err);
  } finally {
    setLoading(false);
  }
};
