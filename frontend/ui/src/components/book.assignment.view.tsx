
import React, { useEffect, useState }  from 'react';
import { Container, Grid, Box, Typography, AppBar, Toolbar, IconButton,
     Button, TextField, TableRow,
     TableBody, TableCell, TableHead, Table, TableContainer, Paper, 
     CardContent,
     Card,
     CardMedia} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import theme from '../themes/books.theme';



const BookAssignment = () => {

    var books: Book[] = [];

    const [searchQuery, setSearchQuery] = useState('');      
    const [booksRes, setApolloResults] = useState<Book[]>([]);
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [addedBooks, setAddedBooks] = useState<Book[]>([]);
    const [openToast, setOpenToast] = useState(false);

    const client = new ApolloClient({
        uri: 'http://localhost:4000',
        cache: new InMemoryCache(),
    });

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await client.query({
                  query: gql`
                    query Query {
                      books {
                        title
                        author
                        coverPhotoURL
                        readingLevel
                      }
                    }
                  `
                });
                books = response.data.books;
                setApolloResults(response.data.books);
                console.log('Books:', response.data.books);
                console.log('Books res:', books);
              } catch (error) {
                console.error('Error fetching books:', error);
              }
            };
            fetchBooks();
      }, []);

    
    const booksData = booksRes;
    
    const handleSearch = () => {
        const filteredResults = booksData.filter(book =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) 
        );
        setSearchResults(filteredResults);
    };

    const handleCloseToast = () => {
        setOpenToast(false);
    };

  
    const handleAdd = (title: string) => {
        const isBookAdded = addedBooks.some(book => book.title === title);
  
        if (isBookAdded) {
            console.log(`Book "${title}" is already added.`);
            setOpenToast(true);
            return;
         }

        // Add book to addedBooks
        const bookToAdd = booksData.find(book => book.title === title);
        if (bookToAdd) {
            setAddedBooks(prevBooks => [...prevBooks, bookToAdd]);
        }
    };
    

    const handleRemove = (title: string) => {
        // Remove book from addedBooks
        setAddedBooks(prevBooks => prevBooks.filter(book => book.title !== title));
    };


    return( <Container maxWidth="lg" >
        <AppBar position="static">
          <Toolbar color='primary.dark'>
            <IconButton edge="start" color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Book Assignment (Teacher)
            </Typography>
            
          </Toolbar>
        </AppBar>

        
        <Box display="flex" justifyContent="center" my={4}>
          <Box display="flex" alignItems="center" sx={{ width: '100%', maxWidth: '500px' }}>
          <TextField
                variant="outlined"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                sx={{
                  flexGrow: 1,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '50px 0 0 50px',
                  },
                }}
              />
            <Button
              variant="contained"
              onClick={handleSearch}
              color="primary"
              sx={{
                borderRadius: '0 50px 50px 0',
                height: '56px', 
              }}
            >
              Look Up
              <SearchIcon />
            </Button>
          </Box>
        </Box>
        
        <Grid container spacing={3}>
        
          <Grid item xs={12} sm={6}>
          <Typography color='primary.dark' variant="h5" gutterBottom>
              Search Results
          </Typography>
          <Box
              p={2}
              bgcolor="background.paper"
              boxShadow={3}
              borderRadius="20px"
              height="400px"
              overflow="auto"
            >
           
          <Grid container spacing={3}>
            {searchResults.map((book, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="120"
                    image={book.coverPhotoURL}
                    alt={book.title}
                  />
                  <CardContent sx={{ flexGrow: 1, padding: '8px' }}>
                    <Typography variant="body2" component="div">
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="secondary.light">
                      Author: {book.author}<br />
                      Reading Level: {book.readingLevel}
                    </Typography>
                    <Button
                    variant='contained'
                    
                      color="primary"
                      onClick={() => handleAdd(book.title)}
                      sx={{ marginTop: '8px', alignSelf: 'flex-end' }}
                    >
                      Add
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
          
          <Typography color='primary.dark' variant="h5" gutterBottom>
            
          Reading List
          </Typography>
            <Box
              p={2}
              bgcolor="background.paper"
              boxShadow={3}
              borderRadius="20px"
              height="400px"
              overflow="auto"
            >
              
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell  color='primary.dark'>Title</TableCell>
                  <TableCell  color='primary.dark'>Author</TableCell>
                  <TableCell  color='primary.dark'>Reading Level</TableCell>
                  <TableCell  color='primary.dark'>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addedBooks.map((book, index) => (
                  <TableRow key={index} style={{ background: index % 2 ? '#f5f5f5' : 'white' }}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.readingLevel}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemove(book.title)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
            </Box>
          </Grid>
        </Grid>
        <Snackbar open={openToast} autoHideDuration={6000} onClose={handleCloseToast}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseToast} severity="error">
            Book is already added!
        </MuiAlert>
        </Snackbar>
      </Container>);

}


interface Book {
    title: string;
    author: string;
    coverPhotoURL: string;
    readingLevel: string;
}
export default BookAssignment;