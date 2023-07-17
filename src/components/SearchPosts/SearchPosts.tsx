import { Box, Button, Chip, Stack, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { searchTextChanged } from '../../store/slices';

export function SearchPosts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInputText, setSearchInputText] = useState('');
  const [appliedSearchText, setAppliedSearchText] = useState(searchParams.get('q') || '');
  const dispatch = useAppDispatch();

  const handleSearchInputTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputText(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    applySearchText(searchInputText);
  };

  const applySearchText = (text: string) => {
    setSearchParams((prevParams) => {
      const nextSearchParams = new URLSearchParams(prevParams.toString());
      text ? nextSearchParams.set('q', text) : nextSearchParams.delete('q');
      nextSearchParams.delete('page');
      return nextSearchParams;
    });
    setSearchInputText('');
  };

  useEffect(() => {
    const newSearchText = searchParams.get('q') || '';
    setAppliedSearchText(newSearchText);
  }, [searchParams]);

  useEffect(() => {
    dispatch(searchTextChanged(appliedSearchText));
  }, [dispatch, appliedSearchText]);

  return (
    <Stack spacing={1} sx={{ alignItems: 'center' }}>
      <Box component="form" sx={{ display: 'flex', justifyContent: 'center', gap: 1 }} onSubmit={handleSearchSubmit}>
        <TextField
          id="search-posts"
          label="Search"
          type="search"
          size="small"
          value={searchInputText}
          onChange={handleSearchInputTextChange}
        />
        <Button variant="contained" type="submit">
          Search
        </Button>
      </Box>
      <Box>
        {appliedSearchText ? (
          <Chip label={`Search text: "${appliedSearchText}"`} onDelete={() => applySearchText('')} />
        ) : null}
      </Box>
    </Stack>
  );
}
