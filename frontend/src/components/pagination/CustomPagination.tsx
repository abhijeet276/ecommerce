import { Pagination, Stack } from '@mui/material'
import React from 'react';

export interface TPagination {
    count: number;
    page: number;
    onChange: ((event: any, value: any) => void)
}

const CustomPagination: React.FC<TPagination> = ({ count, page, onChange }) => {
    return (
        <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', paddingRight: 2 }}>
            <Pagination
                color="primary"
                count={count}
                page={page}
                onChange={onChange}
                shape="rounded"
                defaultPage={1}
                sx={{
                    '& .MuiPaginationItem-root': {
                        '&:hover': {
                            backgroundColor: 'tomato',
                        },
                        '&.Mui-selected': {
                            backgroundColor: 'tomato',
                        },
                    },
                }}
            />
        </Stack>
    )
}

export default CustomPagination