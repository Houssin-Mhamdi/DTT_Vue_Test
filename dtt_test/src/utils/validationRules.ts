export function validate(field: string, value: any) {
  const optionalFields = ["numberAddition"];
  if (optionalFields.includes(field)) {
    return "";
  }

  if (value === null || value === "" || value === undefined) {
    if (field === "image") {
      return "An image is required.";
    }
    return "This field is required.";
  }

  if (field === "zip") {
    const postalCodeRegex = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
    if (!postalCodeRegex.test(value)) {
      return "Invalid postal code format (e.g., 1234 AB).";
    }
  }

  if (field === "constructionYear") {
    const year = parseInt(value, 10);
    if (isNaN(year) || year < 1800 || year > new Date().getFullYear()) {
      return "Please enter a valid year.";
    }
  }

  return "";
}
