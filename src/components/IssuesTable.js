import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Skeleton } from 'primereact/skeleton';
import { DataView } from 'primereact/dataview';
import { Button } from '@primer/react';
import { ScrollPanel } from 'primereact/scrollpanel';

import TypeTag from './TypeTag';
import PriorityTag from './PriorityTag';
import SeverityTag from './SeverityTag';

function IssuesTable({ issues }) {    
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        subject: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        assigned_to: { value: null, matchMode: FilterMatchMode.IN },
        type: { value: null, matchMode: FilterMatchMode.EQUALS },
        severity: { value: null, matchMode: FilterMatchMode.EQUALS },
        priority: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');



    const [type] = useState(['B', 'E', 'Q']);
    const [severity] = useState(['W', 'M', 'N', 'I', 'C']);
    const [priority] = useState(['L', 'N', 'H']);
    

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setGlobalFilterValue(value);
    };

    const typeBodyTemplate = (issue) => {
        return <TypeTag type={issue.type} />;
    };
    const severityBodyTemplate = (issue) => {
        return <SeverityTag severity={issue.severity} />;
    };
    const priorityBodyTemplate = (issue) => {
        return <PriorityTag priority={issue.priority} />;
    };

    const typeItemTemplate = (option) => {
        return <TypeTag type={option} />;
    };
    const severityItemTemplate = (option) => {
        return <SeverityTag severity={option} />;
    };
    const priorityItemTemplate = (option) => {
        return <PriorityTag priority={option} />;
    };

    

    /*
    const userRowFilterTemplate = (options) => {
        return (
            <MultiSelect
                value={options.value}
                options={representatives}
                itemTemplate={representativesItemTemplate}
                onChange={(e) => options.filterApplyCallback(e.value)}
                optionLabel="name"
                placeholder="Any"
                className="p-column-filter"
                maxSelectedLabels={1}
                style={{ minWidth: '14rem' }}
            />
        );
    };
    */


    const typeRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={type} onChange={(e) => options.filterCallback(e.value)} itemTemplate={typeItemTemplate} placeholder="Select One" className="p-column-filter" showClear />
            //<Dropdown value={options.value} options={type} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={typeItemTemplate} placeholder="Select One" className="p-column-filter" showClear />
        );
    };

    const severityRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={severity} onChange={(e) => options.filterCallback(e.value)} itemTemplate={severityItemTemplate} placeholder="Select One" className="p-column-filter" showClear />
            //<Dropdown value={options.value} options={severity} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={severityItemTemplate} placeholder="Select One" className="p-column-filter" showClear />
        );
    };

    const priorityRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={priority} onChange={(e) => options.filterCallback(e.value)} itemTemplate={priorityItemTemplate} placeholder="Select One" className="p-column-filter" showClear />
            //<Dropdown value={options.value} options={priority} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={priorityItemTemplate} placeholder="Select One" className="p-column-filter" showClear />
        );
    };

    // Header
    const renderHeader = () => {
        return (
            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                <span className="text-xl text-900 font-bold">Issues</span>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const header = renderHeader();

    // Other posible way to make it 
    const issueItem = (issue) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="flex align-items-center gap-3 text-2xl text-900">
                                <div className="text-2xl font-bold text-900">
                                    {issue.id}
                                </div>
                                {issue.subject}
                            </div>
                            <div className="flex align-items-center gap-3">
                                <TypeTag type={issue.type} />
                                <SeverityTag severity={issue.severity} />
                                <PriorityTag priority={issue.priority} />
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const getDataView = () => {
        return (
            <DataView value={issues} header={header} itemTemplate={issueItem} filters={filters} filterDisplay="row" emptyMessage="No Issues found."
                globalFilterFields={['subject', 'assigned_to.name', 'type', 'severity', 'priority']} tableStyle={{ minWidth: '60rem' }}>
            </DataView>
        )
    }

    // Return the Skeleton for the loading animation
    const getSkeleton = () => {
        return (
            <Skeleton></Skeleton>
        )
    }

    // Return the Table
    const getTable = () => {
        return (
            <DataTable sortField="id" sortOrder={-1} value={issues} header={header} filterDisplay="row" filters={filters} emptyMessage="No Issues found."
                globalFilterFields={['subject', 'assigned_to.name', 'type', 'severity', 'priority']} tableStyle={{ minWidth: '60rem' }}>
                <Column field="id" header="ID" sortable ></Column>
                <Column field="subject" header="Subject" sortable filter filterPlaceholder="Search by subject"></Column>
                <Column field="type" header="Type" sortable body={typeBodyTemplate} showFilterMenu={false} filterMenuStyle={{ maxWidth: '14rem' }} style={{ maxWidth: '12rem' }} filter filterElement={typeRowFilterTemplate}></Column>
                <Column field="severity" header="Severity" sortable body={severityBodyTemplate} showFilterMenu={false} filterMenuStyle={{ maxWidth: '14rem' }} style={{ maxWidth: '12rem' }} filter filterElement={severityRowFilterTemplate}></Column>
                <Column field="priority" header="Priority" sortable body={priorityBodyTemplate} showFilterMenu={false} filterMenuStyle={{ maxWidth: '14rem' }} style={{ maxWidth: '12rem' }} filter filterElement={priorityRowFilterTemplate}></Column>
            </DataTable>
        )
    }

    

    return (
        <div className="card">
            {issues.length === 0 ? getSkeleton() :  getTable() }
        </div>
    );
}

export default IssuesTable