"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Button from "../others/Button";
import Heading from "../others/Heading";
import "./../../styles/components/contact.scss";
import FacebookIcon from "../icons/FacebookIcon";
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="contact_section h-screen">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-2 gap-12">
          <div className="contact_info">
            <Heading title="Contact" />

            <ul className="contact_list">
              <li>
                <div className="contact_icon">
                  <Phone />
                </div>
                <div className="contact_text">
                  <h4>Phone</h4>
                  <p data-cursor-type="link">
                    <Link href="tel:+8801712345678">+880 1712 345 678</Link>
                  </p>
                </div>
              </li>
              <li>
                <div className="contact_icon">
                  <Mail />
                </div>
                <div className="contact_text">
                  <h4>Email</h4>
                  <p data-cursor-type="link">
                    <Link href="mailto:info@example.com">info@example.com</Link>
                  </p>
                </div>
              </li>
              <li>
                <div className="contact_icon">
                  <MapPin />
                </div>
                <div className="contact_text">
                  <h4>Location</h4>
                  <p>123 Main St, Anytown, USA</p>
                </div>
              </li>
            </ul>

            <ul className="social">
              <li data-cursor-type="link">
                <Link href="https://www.facebook.com/" target="_blank">
                  <FaFacebookSquare />
                </Link>
              </li>
              <li data-cursor-type="link">
                <Link href="https://www.twitter.com/" target="_blank">
                  <FaTwitterSquare />
                </Link>
              </li>
              <li data-cursor-type="link">
                <Link href="https://www.linkedin.com/" target="_blank">
                  <FaLinkedin />
                </Link>
              </li>
            </ul>
          </div>
          <div className="contact_form">
            <form action="">
              <div className="input_wrapper">
                <input type="text" placeholder="Name" />
                <label htmlFor="name">Name</label>
                <div className="bottom_bar"></div>
              </div>
              <div className="input_wrapper">
                <input type="text" placeholder="Subject" />
                <label htmlFor="subject">Subject</label>
                <div className="bottom_bar"></div>
              </div>
              <div className="input_wrapper">
                <textarea
                  name=""
                  id=""
                  cols={10}
                  rows={10}
                  placeholder="Message"
                ></textarea>
                <label htmlFor="message">Message</label>
                <div className="bottom_bar"></div>
              </div>
              <Button>Send</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}