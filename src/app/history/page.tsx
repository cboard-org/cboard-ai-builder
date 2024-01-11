import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, List, ListItem, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HistoryItem from "./HistoryItem";


export default function History() {
    return <Accordion>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        >
            
                History
            
        </AccordionSummary>
        <AccordionDetails>
            <List>
                <HistoryItem text="Little family in a camp with a cup" date="Yesterday"/>
                <Divider/>
                <HistoryItem text="Little family in a camp with a cup" date="Yesterday"/>
                <Divider/>

            </List> 
            
        </AccordionDetails>

    </Accordion>
}