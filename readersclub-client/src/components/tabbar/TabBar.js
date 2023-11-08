import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const TabBar = () => {
    const navigate = useNavigate()


    const [value, setValue] = useState(0);
    const tabOption = [
        { lable: "all Books", field: "isDeleted", value: false, string: "" },
        // { lable: "New Arrival", field: "", value: '', string: "new arrival" },
        { lable: "Best Selling", field: "soldCopies", value: 50, string: "best selling" },
        { lable: "Fiction", field: "category", value: 'fiction', string: "fiction" },
        { lable: "Biography", field: "category", value: 'biography', string: 'biography' },
        { lable: "Humour", field: "category", value: 'humour', string: "humour" },
        { lable: "Politics", field: "category", value: 'politics', string: "politics" },
        { lable: "Novel", field: "category", value: 'novel', string: "novel" },
        { lable: "History", field: "category", value: 'history', string: "history" },
        { lable: "Engineering", field: "category", value: 'engineering', string: "engineering" },
        { lable: "Scify", field: "category", value: 'scify', string: "scify" },
        { lable: "Health", field: "category", value: 'health', string: "health" },
        { lable: "School", field: "category", value: 'school', string: "school" },
    ]

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };
    const handleClick = (newValue, field, value, lable) => {

        setValue(newValue);
        navigate('/list', { state: { field, value, lable } })
    };

    return (
        <Box sx={{
            // maxWidth: { xs: 320, sm: 480 }
            bgcolor: '#eeeded'
        }}>
            <Tabs
                value={value}
                // onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >

                {tabOption.map((item, ind) => {
                    return (
                        <Tab key={ind} onClick={() => { handleClick(ind, item?.field, item?.value, item?.lable) }} label={item?.lable} />
                    )
                })}
                {/* <Tab label="Fiction" />
                <Tab label="Biograpy" />
                <Tab label="New Arrival" />
                <Tab label="Best Deals" />
                <Tab label="Business" />
                <Tab label="Humour" />
                <Tab label="Politcs" />
                <Tab label="Novel" />
                <Tab label="History" />
                <Tab label="Health" />
                <Tab label="Scify" />
                <Tab label="School" />
                <Tab label="Engineering" /> */}

            </Tabs>
        </Box>
    );
}

export default TabBar