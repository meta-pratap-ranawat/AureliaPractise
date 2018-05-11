import {autoinject, customElement, observable, View} from "aurelia-framework";

import {GridOptions} from "ag-grid";

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';


// only import this if you are using the ag-Grid-Enterprise
//import "ag-grid-enterprise/main";

//import PartialMatchFilter from "../filters/partialMatch";



@autoinject()
@customElement('my-grid-page')
export class MyGridPage {

    private gridOptions: GridOptions;
    private quickFilterText: string;
    private quickGoToPage: number;
    private sortingOrders = ['asc', 'desc'];
    private paginationPageSizes = [1,5,10,50,100];
    private gridOptionsApi: any;
    private pageRowDetail: any;
    @observable() pageBucket: Array<number>;
    @observable() currentPage: number;
    @observable() lastPage: number;
    @observable({ changeHandler: 'changeSorting' }) selectedSortingOrder: string = '';
    @observable({ changeHandler: 'changePaginationPageSize' }) selectedPaginationPageSize: number;

    constructor() {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.rowData = this.createRowData();
        this.gridOptions.pagination = true;
        this.gridOptions.suppressPaginationPanel = true;
        this.gridOptions.paginationPageSize = 10;
    }

    private onGridReady()
    {
        this.gridOptionsApi = this.gridOptions.api;
        this.selectedPaginationPageSize = 10;
        this.initializePageBucket(5);
        
        this.updatePageRowDetail();
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

    private onFilterTextBoxChanged()
    {
        if(this.gridOptions == undefined || this.gridOptions.api == undefined) return;

        this.gridOptions.api.setQuickFilter(this.quickFilterText);

        this.initializePageBucket(5);
    }

    private changeSorting(newValue, oldValue)
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

    private changePaginationPageSize(newValue, oldValue)
    {
        if(this.gridOptions == undefined || this.gridOptions.api == undefined) return;

        if(newValue != oldValue)
        {
            this.gridOptions.api.paginationSetPageSize(newValue);
            this.initializePageBucket(5);
        }
        
    }
    
    private onPaginationChanged() {
        if (this.gridOptionsApi) 
        {
            this.updatePageRowDetail();
            this.updatePageBucket(this.gridOptionsApi.paginationGetCurrentPage()+1, this.gridOptionsApi.paginationGetTotalPages());
        }
    }

    private initializePageBucket(defaultPageBucketSize: number)
    {
        let pageBucketSize = this.gridOptionsApi.paginationGetTotalPages() < defaultPageBucketSize ? this.gridOptionsApi.paginationGetTotalPages() : defaultPageBucketSize;
        this.pageBucket = [];
        for(let i=1; i<= pageBucketSize; i++)
        {
            this.pageBucket.push(i);
        }
            
    }

    private updatePageRowDetail()
    {
        this.currentPage = this.gridOptionsApi.paginationGetCurrentPage() + 1; // indexing start from 1
        this.lastPage = this.gridOptionsApi.paginationGetTotalPages();
        let totalPages = this.lastPage;
        let currPage =  this.gridOptionsApi.paginationGetCurrentPage(); // indexing start from 0
        let rowCnt = this.gridOptionsApi.paginationGetRowCount();
        let pageSize = this.gridOptionsApi.paginationGetPageSize();

        if(totalPages <= 1)
        {
            this.pageRowDetail = (rowCnt+" of "+rowCnt);
        }
        else
        {
            if(this.currentPage == totalPages) //checking for last page
            {
                if((rowCnt % pageSize) == 1)
                {
                    this.pageRowDetail = ((currPage * pageSize) + 1) + " of " + rowCnt;  
                }
                else
                {
                    this.pageRowDetail = ((currPage * pageSize) + 1) +"-"+((currPage * pageSize) + (rowCnt % pageSize)) + " of " + rowCnt;  
                }
              
            }
            else
            {
                this.pageRowDetail = (((currPage * pageSize) + 1) +"-"+((currPage + 1) * pageSize) +" of "+rowCnt);
            }
        }
    }
    
    private onBtFirst() {
        this.gridOptions.api.paginationGoToFirstPage();
    }

    private updatePageBucket(value: number, totalPages: number)
    {
        let pbl = totalPages < 5 ? totalPages : 5;
        if(value < this.pageBucket[0] && value > 0)
        {
            this.pageBucket = [];
            for(let i=0; i<pbl; i++)
            {
                this.pageBucket.push(value + i);
            }
        }
        if(value > this.pageBucket[pbl - 1] && value <= totalPages)
        {
            this.pageBucket = [];
            for(let i=pbl; i>0; i--)
            {
                this.pageBucket.push(value - i + 1);
            }
        }
    }
    
    private onBtLast() {
        this.gridOptions.api.paginationGoToLastPage();
    }
    
    private onBtNext() {
        this.gridOptions.api.paginationGoToNextPage();
    }
    
    private onBtPrevious() {
        this.gridOptions.api.paginationGoToPreviousPage();
    }

    private onBtGoToPage(value: any) {
        if(value)
        {
            this.gridOptions.api.paginationGoToPage(value - 1);
        }
        else
        {
            this.gridOptions.api.paginationGoToPage(this.quickGoToPage - 1);
        }
    }

}

