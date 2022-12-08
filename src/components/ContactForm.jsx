import React from 'react';
import emailjs from 'emailjs-com';
import { Button, Container, Form, Row } from 'react-bootstrap';

const ContactForm = () => {
  function sendEmail(e) {
    e.preventDefault();
    console.log(e.target);
    emailjs
      .sendForm(
        'service_cygf00l',
        'template_ikjch3q',
        e.target,
        'y3B1DjdupIqMz2ata'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  return (
    <>
      <Container className="border">
        <div className="m-4">
          <Container className="container">
            <div className="bg-light ApplyForm-header m-5">
              <h2 className="text-dark  p-2 text-center">Contact Us</h2>
            </div>
          </Container>
        </div>
        <Form onSubmit={sendEmail}>
          <Row className="row pt-3 mx-auto">
            <Form.Group className="col-8  mx-auto">
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                required
                minLength="5"
              />
            </Form.Group>
            <Form.Group className="col-8 form-group pt-2 mx-auto">
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="email"
                required
              />
            </Form.Group>
            <Form.Group className="col-8 pt-2 mx-auto">
              <Form.Control
                type="text"
                placeholder="Subject"
                name="subject"
                required
              />
            </Form.Group>
            <Form.Group className="col-8 pt-2 mx-auto mb-3">
              <textarea
                className="form-control"
                id=""
                cols="30"
                rows="8"
                placeholder="Your message"
                name="message"
                pattern="(?=.*[a-z])(?=.*[A-Z]).{25,}"
                minLength="25"
                required
              ></textarea>
            </Form.Group>
            <Button
              className="col-4 p-2 mx-auto w-50 btn bg-dark "
              type="submit"
            >
              Send Message
            </Button>
          </Row>
          <br></br>
        </Form>
      </Container>
      <div>
        <Form.Group className="col-5 mx-auto">
          <h2 className="text-secondary p-2 text-center">
            Find Us at Google Maps
          </h2>
        </Form.Group>
        <iframe
          className="embed-responsive-item col-12 mx-auto"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14136.726492820946!2d83.5714745790661!3d27.649851925050264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996826fb7c251fb%3A0x82a2ef09f7cb7e8d!2sShitalnagar%2C%20Devdaha%20Municipality%2032900!5e0!3m2!1sen!2snp!4v1605190504153!5m2!1sen!2snp"
          width="350"
          height="350"
          frameBorder="0"
          // aria-hidden="false"
          // tabindex="0"
          allowFullScreen=""
        ></iframe>
      </div>
    </>
  );
};
export default ContactForm;
