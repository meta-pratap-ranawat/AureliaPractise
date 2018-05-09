import {autoinject, customElement, observable, View} from "aurelia-framework";

import {GridOptions} from "ag-grid";

// only import this if you are using the ag-Grid-Enterprise
//import "ag-grid-enterprise/main";

//import PartialMatchFilter from "../filters/partialMatch";



@autoinject()
@customElement('my-grid-page')
export class MyGridPage {

    private gridOptions: GridOptions;
    public quickFilterText: string;
    public sortingOrders = ['asc', 'desc'];
    public paginationPageSizes = [1,5,10,50,100];
    private gridOptionsApi: any;

    @observable({ changeHandler: 'changeSorting' }) selectedSortingOrder: string = '';
    @observable({ changeHandler: 'changePaginationPageSize' }) selectedPaginationPageSize: number;

    constructor() {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.rowData = this.createRowData();
        //this.gridOptions.enableFilter = true;
        //this.gridOptions.enableSorting = true;
        this.gridOptions.pagination = true;
        this.gridOptions.suppressPaginationPanel = true;
        this.gridOptions.onPaginationChanged =  this.onPaginationChanged;
        this.gridOptions.paginationPageSize = this.selectedPaginationPageSize = 10;
        this.gridOptionsApi = this.gridOptions.api;
        //this.gridOptions.enableSorting = true;
        // this.gridOptions.defaultColDef = {
        //     menuTabs: ['filterMenuTab']
        // }
    }

    private createRowData()
    {
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

    public onFilterTextBoxChanged()
    {
        if(this.gridOptions == undefined || this.gridOptions.api == undefined) return;

        this.gridOptions.api.setQuickFilter(this.quickFilterText);
    }

    public changeSorting(newValue, oldValue)
    {
        if(this.gridOptions == undefined || this.gridOptions.api == undefined) return;

        if(newValue != oldValue)
        {
            var sort = [
                {colId: 'row', sort: newValue}
            ];
            this.gridOptions.enableSorting = true;
            this.gridOptions.api.setSortModel(sort);
            this.gridOptions.enableSorting = false;
        }
        
    }

    public changePaginationPageSize(newValue, oldValue)
    {
        if(this.gridOptions == undefined || this.gridOptions.api == undefined) return;

        if(newValue != oldValue)
        {
            this.gridOptions.api.paginationSetPageSize(newValue);
            this.gridOptionsApi = this.gridOptions.api;
        }
        
    }

    setText(selector, text) {
        document.querySelector(selector).innerHTML = text;
    }
    
    onPaginationChanged(this) {
        console.log('onPaginationPageLoaded');
    
        // Workaround for bug in events order
        if (this.gridOptionsApi) {
            this.setText('#lbPageSize', this.gridOptionsApi.paginationGetPageSize());
            // we +1 to current page, as pages are zero based
            this.setText('#lbCurrentPage', this.gridOptionsApi.paginationGetCurrentPage() + 1);
            this.setText('#lbTotalPages', this.gridOptionsApi.paginationGetTotalPages());
            this.setText('#lbRowCnt',this.gridOptionsApi.paginationGetRowCount());
        }
    }
    
    onBtFirst() {
        this.gridOptions.api.paginationGoToFirstPage();
    }
    
    onBtLast() {
        this.gridOptions.api.paginationGoToLastPage();
    }
    
    onBtNext() {
        this.gridOptions.api.paginationGoToNextPage();
    }
    
    onBtPrevious() {
        this.gridOptions.api.paginationGoToPreviousPage();
    }
    
    //  getPartialMatchFilter() {
    //      return PartialMatchFilter;
    //  }
}

