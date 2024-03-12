import React, { useState } from 'react';
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Grid,
} from '@mui/material';
import { MdExpandMore } from "react-icons/md";
import { styled } from '@mui/system';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  width: '800px',
  marginBottom: 8,
  background: '#e0e0e0',
}));

const StyledDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%', // Make it full-width
  marginTop: 6,
});

const StyledHeading = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '16px',
  marginTop:"20px",
});

const StyledAnswer = styled(Typography)({
  fontSize: '1rem',
  color: '#585959',
  background: '#ffffff',
  padding: '10px',
  borderRadius: '4px',
  textAlign:"justify"
});

const LeftContainer = styled('div')({
  flex: '1',
  padding:'50px',
});

const RightContainer = styled('div')({
  flex: '1', // Occupy available space
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const AccordionItem = ({ question, answer, expanded, onChange }) => (
  <Accordion expanded={expanded} onChange={onChange}>
    <AccordionSummary expandIcon={<MdExpandMore />}>
      <Typography variant="h6">{question}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <StyledAnswer>{answer}</StyledAnswer>
    </AccordionDetails>
  </Accordion>
);

const FaqAccordion = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const faqData = [
    {
      question: 'What is GoCarsmith?',
      answer:
        'GoCarsmith is a network of technology-enabled car service centres, offering a seamless service experience at the convenience of a tap. With our highly skilled technicians, manufacturer recommended procedures and the promise of genuine spare parts, we are your best bet.',
    },
        {
            question: 'Why should I choose GoCarsmith?',
            answer: 'GoCarsmith offers the best car services and solutions at fair and flexible prices. You end up saving up to 40% compared to what is charged at Authorised Service Centres and Multi-brand workshops'
        },
        {
            question: 'How can you offer upto 40% savings on services?',
            answer: 'Our distinctive business model enables us to provide affordable car services. We achieve savings on labour costs, centralized bulk procurement of spare parts, no real-estate overheads, and adept operational excellence, which are passed on straight to You- the Customer.',
        },
        {
            question: 'How is GoCarsmith different from other service platforms out there?',
            answer:
                'Unlike other platforms, we do not work on a lead generation model. Uncompromised customer gratification is our idea of fulfilment, that is why we own the complete experience right from procurement of spare parts to quality control at our partner car service centres. Our Customer Representative will be on ground duty promptly reporting every development directly to you. GoCarsmith is your personal car service expert and partner rolled into one.',
        },
        {
            question: 'Where can I book a car service with GoCarsmith?',
            answer:
                'You can book a GoCarsmith car service directly from our website or by downloading the exclusive Android App. Want a more human experience? call or WhatsApp on 08913576079. GoCarsmith car services are also available on Paytm Mall.',
        },
        {
            question: 'How to book a car service with GoCarsmith?',
            answer:
                'We have made booking a car service as easy as 1-2-3. Just select you Car’s make, model and fuel type, select the type of car service you require, Choose your preferred time slot And Enjoy! We offer free pick-up and drop-in, so you don’t miss out the cherished moments with your loved ones.',
        },
        {
            question: 'What if I am not available to drop my car?',
            answer:
                'Worry not! We’ll take care of everything. We offer free pick-up and drop-in.',
        },
        {
            question: 'Do I have to pay before the service?',
            answer:
                'Not at all. From the booking to delivery, our priority at GoCarsmith keeps You and Your Car Service first. We will send you the bill once your car is serviced and inspected by our professionals. We offer flexible payment options for your ease. You can still prepay if you choose to.',
        },

    ];

    return (
        <StyledDiv>
          <StyledHeading variant="h6" >Frequently Asked Questions</StyledHeading>
          <Grid container spacing={2}>
            <LeftContainer>
              {faqData.map((faq, index) => (
                <Grid item xs={12} key={index}>
                  <AccordionItem
                    question={faq.question}
                    answer={faq.answer}
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                  />
                </Grid>
              ))}
            </LeftContainer>
            <RightContainer>
              {/* Add your image here */}
              <img
                src="https://img.freepik.com/premium-photo/set-different-wrenches-white-background-top-view-plumbing-tools_495423-53715.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699142400&semt=ais"
                alt="Your "
                style={{ width: '400px', height: '500px', borderRadius: '8px' }}
              />
            </RightContainer>
          </Grid>
        </StyledDiv>
      );
    };
    
    export default FaqAccordion;