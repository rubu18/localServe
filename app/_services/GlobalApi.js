import { gql, request } from "graphql-request";

const MASTER_URL =
  "https://ap-south-1.cdn.hygraph.com/content/cm2g9m4p802qx06v2vd8345j0/master";
console.log("MASTER_URL:", MASTER_URL);

// Function to fetch categories
export const getCategory = async () => {
  const query = gql`
    query Category {
      categories {
        bgcolor {
          hex
        }
        id
        name
        icon {
          url
        }
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, query);
    console.log("Fetched categories:", result.categories);
    return result.categories || [];
  } catch (error) {
    console.error(`Error fetching categories: ${error.message}`, error);
    throw error;
  }
};

// Function to fetch all business lists
export const getAllBusinessList = async () => {
  const query = gql`
    query BusinessList {
      businessLists {
        about
        address
        category {
          name
        }
        contactPerson
        email
        images {
          url
        }
        id
        name
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, query);
    console.log("Fetched businesses:", result.businessLists);
    return result.businessLists || [];
  } catch (error) {
    console.error(`Error fetching business list: ${error.message}`, error);
    throw error;
  }
};

// Function to fetch businesses by category
export const getBusinessByCategory = async (category) => {
  if (!category) {
    throw new Error("Category is required");
  }

  const query = gql`
    query GetBusinessByCategory($category: String!) {
      businessLists(where: { category: { name: $category } }) {
        about
        address
        category {
          name
        }
        contactPerson
        email
        images {
          url
        }
        id
        name
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, query, { category });
    console.log("Fetched businesses by category:", result.businessLists);
    return result.businessLists || [];
  } catch (error) {
    console.error(`Error fetching businesses by category: ${error.message}`, error);
    throw error;
  }
};

// Function to fetch business details by ID
export const getBusinessById = async (id) => {
  if (!id) {
    throw new Error("Business ID is required");
  }

  const query = gql`
    query GetBusinessById($id: ID!) {
      businessList(where: { id: $id }) {
        about
        address
        category {
          name
        }
        contactPerson
        email
        id
        images {
          url
        }
        name
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, query, { id });
    console.log("Fetched business by ID:", result.businessList);
    return result.businessList || null;
  } catch (error) {
    console.error(`Error fetching business by ID: ${error.message}`, error);
    throw error;
  }
};

// Function to fetch booking history
export const GetBookingHistory = async (userEmail) => {
  if (!userEmail) {
    throw new Error("User email is required to fetch booking history.");
  }

  const query = gql`
    query GetUserBookingHistory($userEmail: String!) {
      bookings(where: { userEmail: $userEmail }) {
        id
      }
      businessLists {
        name
        images {
          url
        }
        contactPerson
        address
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, query, { userEmail });
    console.log("Fetched booking history:", result.bookings);
    return result.bookings || [];
  } catch (error) {
    console.error(`Error fetching booking history: ${error.message}`, error);
    throw error;
  }
};

// Function to create a booking
// export const createBooking = async (businessId, date, time, userName, userEmail) => {
//   if (!businessId || !date || !time || !userName || !userEmail) {
//     throw new Error("All fields are required to create a booking.");
//   }

//   const mutation = gql`
//     mutation CreateBooking(
//       $businessId: ID!
//       $date: String!
//       $time: String!
//       $userName: String!
//       $userEmail: String!
//     ) {
//       createBooking(
//         data: {
//           bookingStatus: confirmed
//           business: { connect: { id: $businessId } }
//           date: $date
//           time: $time
//           userName: $userName
//           userEmail: $userEmail
//         }
//       ) {
//         id
//       }
//     }
//   `;

//   try {
//     const variables = { businessId, date, time, userName, userEmail };
//     const result = await request(MASTER_URL, mutation, variables);
//     console.log("Created booking:", result.createBooking);
//     return result.createBooking || null;
//   } catch (error) {
//     console.error(`Error creating booking: ${error.message}`, error);
//     throw error;
//   }
// };
export const createBooking = async (businessId, date, time, userName, userEmail) => {
  if (!businessId || !date || !time || !userName || !userEmail) {
    throw new Error("All fields are required to create a booking.");
  }

  const mutation = gql`
    mutation CreateBooking(
      $businessId: ID!
      $date: String!
      $time: String!
      $userName: String!
      $userEmail: String!
    ) {
      createBooking(
        data: {
          bookingStatus: confirmed
          business: { connect: { id: $businessId } }
          date: $date
          time: $time
          userName: $userName
          userEmail: $userEmail
        }
      ) {
        id
      }
    }
  `;

  const variables = { businessId, date, time, userName, userEmail };

  try {
    console.log("Creating booking with variables:", variables); // Debugging input
    const result = await request(MASTER_URL, mutation, variables);
    console.log("Booking created successfully:", result.createBooking); // Debugging response
    return result.createBooking || null;
  } catch (error) {
    console.error(`Error creating booking: ${error.message}`, error);
    throw error;
  }
};

// Export all functions as an object
const GlobalApi = {
  getCategory,
  getAllBusinessList,
  getBusinessByCategory,
  getBusinessById,
  GetBookingHistory,
  createBooking,
};

export default GlobalApi;
