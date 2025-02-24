import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';
import "./Display.scss";

export function CalenderPage(){
    return(
    <div className='cp-container'>
    <div className='calender-container'>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{
            width: '400px',
            height: '350px',
            backgroundColor: 'grey',
            padding: '100px'



        }}>
        <DateCalendar sx={{
             transform: 'scale(1.5)',
             '& .MuiDayPicker-day': {
                 fontSize: '1.5rem'
             },
             '& .MuiDayPicker-weekdayLabel': {
                 fontSize: '1.25rem',
             }
        }}
        />
         </Box>
    </LocalizationProvider>
    </div>
    <div className='event-information'>
        <h3>Fun Run for the Cure</h3>
        <p>Every year, the Bank of America Chicago Marathon hosts thousands of runners who choose to make their Chicago Marathon experience more meaningful by running on behalf of a charity. This year, charities need our help more than ever. Help support and run with a charity you are passionate about.
            View participating charities through the Charity Index.
        </p>

    </div>
    </div>
    )
}