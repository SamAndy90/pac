// Import necessary dependencies here

// Define your field schemas here
const titleField = {
    name: 'title',
    title: 'Title',
    type: 'string',
  };
  
  // Define your section schemas (slider, joinpeacekkeper, etc.) here
  
  // Define the "Ancillary Pages Template"
  export default {
    name: 'ancillaryPagesTemplate',
    title: 'Ancillary Pages Template',
    type: 'document',
    fields: [
      titleField, // Include a title field for the page
      {
        name: 'sections',
        title: 'Sections',
        type: 'array',
        of: [
          // Define your sections here, like slider, joinpeacekkeper, and more
          {
            type: 'slider',
            name: 'slider',
            // Define slider section fields
          },
          {
            type: 'joinpeacekkeper',
            name: 'joinpeacekkeper',
            // Define joinpeacekkeper section fields
          },
          // Add more sections as needed
        ],
      },
    ],
  };
  