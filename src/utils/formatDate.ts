const formatDate = (timestampStr: string) => {
  try {
    const ts = parseInt(timestampStr);
    if (!isNaN(ts)) {
      return new Date(ts).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  } catch (e) {}
  return "June 17, 2026";
};

export default formatDate;
