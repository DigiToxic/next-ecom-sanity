import "../globals.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faYoutube,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import SearchInput from "./SearchInput";
import Navbar from "./Slider";
import CartProvider from "./CartProvider";

export const metadata = {
  title: "Tale Traders",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <html lang="en">
        <body>
          <header>
            <nav className="header-nav">
              <Link href="/">
                <img
                  className="header-logo"
                  src="photos/ecom-logo.webp"
                  alt="Logo"
                />
              </Link>
              <ul>
                <li className="nav-Shop-link">
                  <Link href="/shop">Shop</Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faUser} />
                </li>
                <li>
                  <SearchInput />
                </li>
                <li>
                  <Navbar />
                </li>
              </ul>
            </nav>
          </header>

          <main>{children}</main>

          <footer>
            <div className="Footer">
              <form
                className="Ecom-Email-Form"
                name="Ecom-Email-Form"
                method="POST"
                data-netlify="true"
                onSubmit="submit"
              >
                <p className="form-phrase">Subscribe For Our Latest Deals</p>
                <p className="actual-form">
                  <input
                    id="email-box"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                  />
                  <button type="submit">Subscribe</button>
                </p>
              </form>
              <div className="supports-container">
                <ul className="supports">
                  <li>Help Center</li>
                  <li>Warranty</li>
                  <li>Product Help</li>
                  <li>Order Status</li>
                  <li>Contact Us</li>
                </ul>
                <ul className="supports">
                  <li>About</li>
                  <li>Bulk Orders</li>
                  <li>Custom Product</li>
                  <li>Recycling</li>
                  <li>Careers</li>
                </ul>
              </div>
              <div className="socials-container">
                <p>FOLLOW US</p>
                <ul className="socials">
                  <li>
                    <FontAwesomeIcon icon={faTwitter} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faInstagram} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faFacebook} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faYoutube} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faDiscord} />
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </CartProvider>
  );
}
