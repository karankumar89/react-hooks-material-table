import React, { useState, useEffect, useRef, forwardRef } from "react";
import MaterialTable from 'material-table'
import Button from '@material-ui/core/Button';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};




function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

const GetDataSet = ({ setResults }) => {
    const [dataSetId, setData] = useState([]);
    const [filteredData, setFilteredData ] = useState([]);
    const buttonRef3 = useRef(null);
    const buttonRef7 = useRef(null);
    const buttonRef30 = useRef(null);
    const buttonRefTest = useRef(null);
    const [isFiltered, setIsFiltered] = useState(false);

    const getfromAPI = async () =>
        await fetch("https://fast-dusk-45749.herokuapp.com/activities")
            .then((res) => res.json()).then((data) => setData(data))
            .catch((error) => (error, '/datasetID'));


    useEffect(() => {
        getfromAPI();
    }, []);

    const filterData = (days) =>{
        let now = new Date();
        let newDate = new Date();
        newDate.setDate(now.getDate() - days);
        console.log(now, newDate);
        let filteredData = dataSetId.filter(data=>{
          let fdate = new Date(data.date);
          if(fdate.getTime() >= newDate.getTime() && fdate.getTime() <= now.getTime()){
            return data
          }
        })
        setFilteredData(filteredData);
        setIsFiltered(true);
    }

    const handleOnClickDate3 = () =>{
        filterData(buttonRef3.current.dataset.val)
    }
    const handleOnClickDate7 = () =>{
        filterData(buttonRef7.current.dataset.val)
    }
    const handleOnClickDate30 = () =>{
        filterData(buttonRef30.current.dataset.val)
    }

    const handleOnClickReset = () =>{
        setIsFiltered(false);
        setFilteredData(dataSetId);
    }

    const handleOnClickTest = () =>{
        filterData(buttonRefTest.current.dataset.val)
    }

    console.log(filteredData, dataSetId, isFiltered);
    return (
        <div style={{width: '420px', height: '600px'}}>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '200px 200px',
                justifyContent: 'center',
                columnGap: '10px',
                rowGap: '10px'
            }}>
                <Button variant="contained" data-val="3" color="primary" ref={buttonRef3} onClick={()=>handleOnClickDate3()}>Last 3 Days</Button>
                <Button variant="contained" data-val="7" color="primary" ref={buttonRef7} onClick={()=>handleOnClickDate7()}>Last 7 Days</Button>
                <Button variant="contained" data-val="30" color="primary" ref={buttonRef30} onClick={()=>handleOnClickDate30()}>Last 30 Days</Button>
                <Button variant="contained" color="secondary" onClick={()=>handleOnClickReset()}>Reset</Button>
                <Button variant="contained" data-val="338" color="secondary" ref={buttonRefTest} onClick={()=>handleOnClickTest()}>Test</Button>
            </div>
            <MaterialTable
                icons={tableIcons}
                columns={[
                   /*  {title: 'id', field: 'id'}, */
                   {
                    title: 'Organizations', field: 'organizations', render: rowData => {
                        if(rowData.classification === "Customer")
                            return rowData.organizations[0].name
                        else if(rowData.classification === "Internal")
                            return "Internal"
                        else
                            return "none"
                    }
                }, //rowData.organizations.join()
                    { title: 'system', field: 'system' }, 
                 /*    { title: 'Classification', field: 'classification' },
                    { title: 'Data', field: 'date' },
                    { title: 'Duration', field: 'duration' }, */

                ]}
                data={ isFiltered ? filteredData: dataSetId}
                title="Retain"
            />
        </div>
    );
}

export default GetDataSet;