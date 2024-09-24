export class ExtendedDatatables {
  constructor() {
    this.tables = {};
  }

  createTable(container, selector, columns, options = {}) {
    const tableElement = container.querySelector(selector);
    if (!tableElement) {
      throw new Error(`Table with selector ${selector} not found.`);
    }

    const id = selector;
    this.tables[id] = {
      element: tableElement,
      columns: columns,
      options: options,
      data: [],
    };

    this.renderTable(id);
    return id;
  }

  addData(id, newData) {
    if (this.tables[id]) {
      this.tables[id].data.push(...newData);
      this.renderTable(id);
    }
  }

  updateData(id, newData) {
    if (this.tables[id]) {
      this.tables[id].data = newData;
      this.renderTable(id);
    }
  }

  clearTable(id) {
    if (this.tables[id]) {
      this.tables[id].data = [];
      this.renderTable(id);
    }
  }

  destroyTable(id) {
    if (this.tables[id]) {
      this.tables[id].element.innerHTML = "";
      delete this.tables[id];
    }
  }

  destroyAllTables() {
    for (let id in this.tables) {
      this.destroyTable(id);
    }
  }

  renderTable(id) {
    if (!this.tables[id]) return;

    const { element, columns, data, options } = this.tables[id];
    element.innerHTML = "";

    // Create table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    columns.forEach((col) => {
      const th = document.createElement("th");
      th.textContent = col.title;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    element.appendChild(thead);

    // Create table body
    const tbody = document.createElement("tbody");
    data.forEach((row) => {
      const tr = document.createElement("tr");
      columns.forEach((col) => {
        const td = document.createElement("td");
        if (typeof col.render === "function") {
          td.innerHTML = col.render(row[col.data], row);
        } else {
          td.textContent = row[col.data] || "";
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    element.appendChild(tbody);

    // Apply custom classes if provided
    if (options.classes && options.classes.table) {
      element.className = options.classes.table;
    }
  }
}

//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * this is the extended data tabled version of original data table library
 *
 * @author janithnirmal https://github.com/janithnirmal
 *
 * @description this module must required to have both jQuery and DataTables js libraries to be linked with the project.
 *
 */
// class ExtendedDatatables {
//   table = null;
//   selector = "";

//   constructor() {}

//   createTabel(selector, dataSet, options) {
//     this.selector = selector;

//     if (options.columns) {
//       options.columns.forEach((element) => {
//         element.render = function (data, type, row) {
//           return data ? data : "N/A";
//         };
//       });
//     }

//     this.table = new DataTable(selector, {
//       ...options,
//       data: dataSet,
//     });
//     return this.table;
//   }

//   /**
//    *
//    * @param {String} newData - data to be udpated
//    * @param {Boolean} replace - if need to just add data to the end of table then add false. default true for replacing
//    */
//   udpateData(newData, replace = true) {
//     if (replace) {
//       this.table.clear();
//     }
//     this.table.rows.add(newData);
//     this.table.draw();
//   }

//   onRowClick(callback = () => {}) {
//     document
//       .querySelector(`${this.selector} tbody`)
//       .addEventListener("click", (event) => {
//         const row = event.target.closest("tr");
//         const data = this.table.row(row).data();
//         callback(row, data);
//       });
//   }

//   onCellClick(callback = () => {}) {
//     document
//       .querySelector(`${this.selector} tbody`)
//       .addEventListener("click", (event) => {
//         const cell = event.target.closest("td");
//         const row = cell.closest("tr");
//         const rowData = this.table.row(row).data();

//         const cellIndex = this.table.cell(cell).index().column;
//         const cellData = rowData
//           ? rowData[this.table.settings()[0].aoColumns[cellIndex].data]
//           : null;
//         callback(cell, cellData);
//       });
//   }

//   onCellClickExtended(callback = () => {}) {
//     document
//       .querySelector(`${this.selector} tbody`)
//       .addEventListener("click", (event) => {
//         const cell = event.target.closest("td");
//         const row = cell.closest("tr");
//         const rowData = this.table.row(row).data();

//         const cellIndex = this.table.cell(cell).index().column;
//         const cellData = rowData
//           ? rowData[this.table.settings()[0].aoColumns[cellIndex].data]
//           : null;
//         callback(cell, cellData);
//       });
//   }
// }

/*
  let table = new DataTable("#sampleTable", {
    data: dataSet,
    columns: [{ data: "name" }, { data: "age" }, { data: "mobile" }],
    paging: true,
    searching: true,
    ordering: true,
    info: true,
    lengthChange: true,
    pageLength: 3,
    order: [
      [0, "asc"],
      [1, "asc"],
    ], // Example: Order by the second column (Position) ascending
    // columnDefs: [
    //   { targets: 1, visible: false }, // Example: Hide the fourth column (Age)
    // ],
    // Add other options as needed
    createdRow: function (row, data, dataIndex) {
      row.cells[2].innerHTML = "<button>Click me</button>";
    },
  });

  setTimeout(() => {
    const newData = [
      {
        name: "New Janith",
        age: 101,
        mobile: "78807888",
      },
      {
        name: "New Kumara",
        age: 788,
        mobile: "565656566",
      },
    ];
    table.clear(); // Clear the existing data
    table.rows.add(newData); // Add new data
    table.draw(); // Redraw the table
  }, 3000);
  */

//   options list

/*

const table = new DataTable('#example', {
    // Data source options
    ajax: "data.json",            // URL for JSON data
    data: [],                     // Data array for local data

    // Data manipulation options
    columns: [                    // Column definitions
        { data: 'name', title: 'Name' },
        { data: 'position', title: 'Position' },
        { data: 'office', title: 'Office' },
        { data: 'age', title: 'Age' },
        { data: 'start_date', title: 'Start date' },
        { data: 'salary', title: 'Salary' }
    ],
    columnDefs: [                 // Column-specific options
        { targets: 0, visible: true },
        { targets: 1, searchable: false }
    ],

    // Feature control options
    paging: true,                 // Enable/disable pagination
    searching: true,              // Enable/disable search
    ordering: true,               // Enable/disable column ordering
    info: true,                   // Show info about the table
    lengthChange: true,           // Enable/disable changing page length
    autoWidth: true,              // Enable/disable automatic column width calculation
    deferRender: true,            // Defer rendering of table content
    stateSave: true,              // Save table state (pagination, search, etc.)

    // Display options
    pageLength: 10,               // Number of rows per page
    lengthMenu: [                 // Page length options
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
    ],
    order: [[0, 'asc']],          // Initial ordering
    responsive: true,             // Enable responsive behavior

    // Language options
    language: {                   // Customization for text
        lengthMenu: "Show _MENU_ entries",
        info: "Showing _START_ to _END_ of _TOTAL_ entries",
        infoEmpty: "No entries to show",
        infoFiltered: "(filtered from _MAX_ total entries)",
        search: "Search:",
        paginate: {
            first: "First",
            last: "Last",
            next: "Next",
            previous: "Previous"
        }
    },

    // Callback functions
    createdRow: function(row, data, dataIndex) {  // Row creation callback
        if (data.age > 40) {
            row.classList.add('highlight');
        }
    },
    drawCallback: function(settings) {            // Table draw callback
        console.log('Table redrawn');
    },

    // State saving options
    stateDuration: 60 * 60 * 24,  // State duration (in seconds)
    stateLoadCallback: function(settings) {
        return JSON.parse(localStorage.getItem('DataTables_' + settings.sInstance));
    },
    stateSaveCallback: function(settings, data) {
        localStorage.setItem('DataTables_' + settings.sInstance, JSON.stringify(data));
    },

    // DOM and styling options
    dom: '<"top"lf>rt<"bottom"ip><"clear">',  // Define the table control elements
    className: 'my-custom-class',              // Add custom class to the table
    scrollY: '50vh',                           // Vertical scrolling
    scrollX: true,                             // Horizontal scrolling
    scrollCollapse: true,                      // Collapse the table when fewer rows are shown
    fixedHeader: true,                         // Fix the header to the top of the page

    // Buttons extension (requires Buttons plugin)
    buttons: [                                 // Define buttons for the table
        'copy', 'csv', 'excel', 'pdf', 'print'
    ]
});


*/
