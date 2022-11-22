import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const NavBarUi = () => {
  return (
    <>
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            /><h1 className='text-center mt-5 mb-5'>Trailer Movies</h1>
            {/*Buscador*/}
            <form className='container mb-4' onSubmit={searchMovies}>
          <input type="text" placeholder='search' onChange={(e)=>setSearchKey(e.target.value)}/>
          <button className='btn btn-primary'>Search</button>
            </form>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}
