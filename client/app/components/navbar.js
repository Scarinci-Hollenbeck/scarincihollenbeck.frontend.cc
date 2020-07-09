import Link from 'next/link';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { SHLogo } from '../utils/next-gen-images';


const NavBar = () => (
  <header className="mt-3">
    <Container>
      <Row className="border-bottom">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand className="mr-5">
            <Link href="/">
              <a>
                <img src={SHLogo} alt="Scarinci Hollenbeck, LLC" />
              </a>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="ml-5">
            <Nav className="ml-3 mt-3">
              <NavDropdown title="The Firm" id="basic-nav-dropdown">
                <NavDropdown.Item href="/administration">
                  Administration
                </NavDropdown.Item>
                <NavDropdown.Item href="/careers">
                  Careers
                </NavDropdown.Item>
                <NavDropdown.Item href="/community-involvement">
                  Community Involvement
                </NavDropdown.Item>
                <NavDropdown.Item href="/diversity-group">
                  Diversity Group
                </NavDropdown.Item>
                <NavDropdown.Item href="/firm-overview">
                  Firm Overview
                </NavDropdown.Item>
                <NavDropdown.Item href="/pro-bono">
                  Pro Bono
                </NavDropdown.Item>
                <NavDropdown.Item href="/women-lead">
                  Women Lead
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Item>
                <Link href="/attorneys">
                  <a>
                    Attorneys
                  </a>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/practices">
                  <a>
                    Practices
                  </a>
                </Link>
              </Nav.Item>
              <NavDropdown title="Library" id="basic-nav-dropdown">
                <NavDropdown.Item href="/category/firm-news">
                  Firm News
                </NavDropdown.Item>
                <NavDropdown.Item href="/category/firm-events">
                  Firm Events
                </NavDropdown.Item>
                <NavDropdown.Item href="/category/law-firm-insights">
                  Firm Insights
                </NavDropdown.Item>
                <NavDropdown.Item href="/category/quick-news?page=1">
                  Quick News
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Item>
                <Link href="/locations">
                  <a>
                    Locations
                  </a>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/contact">
                  <a>
                    Contact
                  </a>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <strong>Phone: </strong>
                {' '}
                201-896-4100
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
    </Container>
  </header>
);

export default NavBar;
