import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';

import { keywordState } from 'recoils/Atoms/keyword';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

interface KeywordSearchFormProps {
  initialValue?: string;
}

const KeywordSearchForm = ({ initialValue }: KeywordSearchFormProps) => {
  const keyword = useRecoilValue<string>(keywordState);
  const setKeyword = useSetRecoilState(keywordState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      Router.push({
        pathname: '/search-result',
        query: {
          keyword,
        },
      });
    }
  };

  useEffect(() => {
    if (initialValue) {
      setKeyword(initialValue);
    }
  }, [initialValue]);

  return (
    <Container>
      <TextField
        autoFocus
        placeholder="키워드 검색"
        variant="outlined"
        value={keyword}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={{ background: '#fff', borderRadius: 8, width: '100%' }}
        InputProps={{
          endAdornment: (
            <Link
              href={{
                pathname: '/search-result',
                query: {
                  keyword,
                },
              }}
            >
              <Button variant="contained" color="primary">
                검색
              </Button>
            </Link>
          ),
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 0px 20px 0px;
  margin-top: 50px;
  border-radius: 8px;
  padding-bottom: 25px;
`;

export default KeywordSearchForm;
