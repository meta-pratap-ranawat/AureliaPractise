import {autoinject, customElement} from "aurelia-framework";

import {GridOptions} from "ag-grid";

// only import this if you are using the ag-Grid-Enterprise
//import "ag-grid-enterprise/main";

//import PartialMatchFilter from "../filters/partialMatch";



@autoinject()
@customElement('my-grid-page')
export class MyGridPage {

    private gridOptions: GridOptions;

    constructor() {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.rowData = this.createRowData();
        this.gridOptions.enableFilter = true;
        this.gridOptions.enableSorting = true;
        this.gridOptions.pagination = true;
        this.gridOptions.paginationPageSize = 10;
        this.gridOptions.enableSorting = true;
        //this.gridOptions.api.setQ
        // this.gridOptions.defaultColDef = {
        //     menuTabs: ['filterMenuTab']
        // }
    }

    private createRowData() {
        return [
            {"row": "Row 1", "name": "Michael Phelps"},
            {"row": "Row 2", "name": "Natalie Coughlin"},
            {"row": "Row 3", "name": "Aleksey Nemov"},
            {"row": "Row 4", "name": "Alicia Coutts"},
            {"row": "Row 5", "name": "Missy Franklin"},
            {"row": "Row 6", "name": "Ryan Lochte"},
            {"row": "Row 7", "name": "Allison Schmitt"},
            {"row": "Row 8", "name": "Natalie Coughlin"},
            {"row": "Row 9", "name": "Ian Thorpe"},
            {"row": "Row 10", "name": "Bob Mill"},
            {"row": "Row 11", "name": "Willy Walsh"},
            {"row": "Row 12", "name": "Sarah McCoy"},
            {"row": "Row 13", "name": "Jane Jack"},
            {"row": "Row 14", "name": "Tina Wills"},
            {"row": "Row 15", "name": "Krishan Kataria"},
            {"row": "Row 16", "name": "Rohit Singhavi"},
            {"row": "Row 17", "name": "Tina Wills"},
            {"row": "Row 18", "name": "Tina Wills"},
            {"row": "Row 19", "name": "Tina Wills"},
            {"row": "Row 20", "name": "Tina Wills"},
            {"row": "Row 21", "name": "Tina Wills"},
            {"row": "Row 22", "name": "Tina Wills"},
            {"row": "Row 23", "name": "Tina Wills"},
            {"row": "Row 24", "name": "Tina Wills"},
            {"row": "Row 25", "name": "Tina Wills"},
            {"row": "Row 26", "name": "Tina Wills"},
            {"row": "Row 27", "name": "Tina Wills"},
            {"row": "Row 28", "name": "Tina Wills"},
            {"row": "Row 29", "name": "Tina Wills"},
            {"row": "Row 30", "name": "Tina Wills"},
            {"row": "Row 31", "name": "Tina Wills"}
        ];
    }

    //  getPartialMatchFilter() {
    //      return PartialMatchFilter;
    //  }
}

