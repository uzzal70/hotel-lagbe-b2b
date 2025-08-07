import {
  Box,
  Container,
  FormControlLabel,
  Radio,
  Stack,
  Typography,
} from '@mui/material';
import LandingHeader from './LandingHeader';
import Footer from './Footer';
import { useState } from 'react';
import companyInfo from '../common/companyInfo';

const RefundPolicy = () => {
  const [value, setValue] = useState('e');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Box sx={{ bgcolor: 'var(--white)' }}>
      <Box sx={{ pb: 2 }}>
        <Container>
          <LandingHeader />

          <Stack
            direction={'row'}
            justifyContent="space-between"
            sx={{
              bgcolor: 'var(--bgcolor)',
              alignItems: 'center',
              mt: 3,
              borderRadius: 1,
            }}
          >
            <Typography
              sx={{
                color: 'var(--primary)',
                py: 1,
                px: 2,
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              {value === 'e' ? 'Refund Policy' : 'রিফান্ড পলিসি'}
            </Typography>
            <Box
              sx={{
                color: 'var(--primary)',

                px: 2,
                '.Mui-checked': {
                  color: 'var(--primary) !important',
                },
              }}
            >
              <div>
                <FormControlLabel
                  value="e"
                  control={
                    <Radio
                      checked={value === 'e'}
                      onChange={handleChange}
                      value="e"
                      name="radio-buttons"
                      inputProps={{ 'aria-label': 'E' }}
                    />
                  }
                  label="English"
                />
                <FormControlLabel
                  value="b"
                  control={
                    <Radio
                      checked={value === 'b'}
                      onChange={handleChange}
                      value="b"
                      name="radio-buttons"
                      inputProps={{ 'aria-label': 'B' }}
                    />
                  }
                  label="Bangla"
                />
              </div>
            </Box>
          </Stack>
          {value === 'b' ? (
            <Box>
              <p>
                আপনার টিকেট লাগবে লিমিটেড সঙ্গে আপনার টিকেট বুকিং করার জন্য
                ধন্যবাদ। আমরা আপনার ক্রয়ের সম্পূর্ণ সন্তুষ্ট না হলেও সাহায্য
                করতে আছি।
              </p>

              <h3>ফেরতের অর্থ্যায়িত্ব</h3>
              <p>
                আমরা নিম্নলিখিত শর্তানুযায়ী টিকেট বুকিং-এ ফেরত দেয়ার অফার করি:
              </p>
              <ul>
                <li>
                  <strong>গ্রাহক দ্বারা বাতিলকরণ:</strong> আপনি যদি আপনার টিকেট
                  বুকিং বাতিল করতে চান, তবে আপনি ট্রান্সপোর্টেশন প্রদাতার
                  বাতিলকরণ নীতির উপর নির্ভর করে ফেরত পাওয়ার যোগ্য হতে পারেন।
                  দয়া করে মনে রাখবেন যে বাতিলকরণ ফি প্রযোজ্য হতে পারে, এবং কিছু
                  বুকিং ফেরত প্রাপ্ত হতে পারে না।
                </li>
                <li>
                  <strong>পরিবহন প্রদাতার দ্বারা বাতিলকরণ:</strong> পরিবহন
                  প্রদাতা আপনার বুকিং বাতিল করে অথবা সময়সূচী পরিবর্তন করলে,
                  তাদের নিয়ম ও শর্তানুযায়ী আপনি একটি ফেরত পাওয়ার অধিকারী হতে
                  পারেন। আমরা পরিবহন প্রদাতার নীতি অনুযায়ী ফেরত প্রস্তুত করার
                  জন্য আপনাকে সাহায্য করব।
                </li>
              </ul>
              <h3>ফেরতের প্রক্রিয়া</h3>
              <p>
                ফেরত অনুরোধ জানাতে, দয়া করে আপনার বুকিং বিবরণ সহ
                {companyInfo.bookingEmail} ঠিকানায় আমাদের সাথে যোগাযোগ করুন।
                আমরা আপনার অনুরোধটি পর্যালোচনা করব এবং ফেরতের প্রক্রিয়াতে
                আপনাকে পরিচিত করব।
              </p>
              <p>দয়া করে নিম্নলিখিত মনে রাখবেন:</p>
              <ul>
                <li>
                  ফেরত এক্সপ্রেস করা হবে বুকিং করার মূল অর্থ ব্যবহৃত অরিজিনাল
                  পেমেন্ট মেথডে। ফেরত প্রক্রিয়ার জন্য প্রসেসিং সময় পেমেন্ট
                  মেথড এবং পরিবহন প্রদাতার নীতি অনুসারে ভিন্নভাবে পরিবর্তন করতে
                  পারে। আমরা ফেরত প্রক্রিয়ার জন্য আনুমানিক সময়সূচী সরবরাহ করব।
                </li>
                <li>
                  পরিবহন প্রদাতার প্রযোজ্য বাতিলকরণ ফি বা জরিমানা যদি প্রযোজ্য
                  হয়, তবে ফেরত পরিমাণ থেকে মোট প্রত্যাবর্তন করা হবে।
                </li>
                <li>
                  আপনার ফেরত প্রসেস হয়ে গেলে, আপনার ব্যাংক বা ক্রেডিট কার্ড
                  ইস্যুকারীর উপর নির্ভর করে কিছু সময় লাগতে পারে যেন ফান্ডগুলি
                  আপনার অ্যাকাউন্টে প্রতিফলিত হয়।
                </li>
              </ul>
              <h3>নো-শো নীতি</h3>
              <p>
                আপনি আগে বাতিলকরণ ছাড়া নির্ধারিত নিয়মিত যাত্রার জন্য
                অনুপ্রানিত হলে, আপনি ফেরতের অধিকার অবহিত হতে পারেন। এই ধরনের
                ক্ষেত্রে, বুকিংটি একটি নো-শো হিসাবে গণ্য হবে, এবং কোনও ফেরত
                প্রদান করা হবে না।
              </p>
              <h3>যোগাযোগ করুন</h3>
              <p>
                আমাদের ফেরত নীতি সম্পর্কে যদি কোনও প্রশ্ন থাকে, তবে আমাদের সাথে
                যোগাযোগ করুন:{' '}
                <a href={`mailto:${companyInfo.bookingEmail}`}>
                  {companyInfo.bookingEmail}
                </a>
              </p>
            </Box>
          ) : (
            <Box pb={2}>
              <p>Last updated: 1 April 2024</p>
              <p>
                Thank you for booking your tickets with{' '}
                {companyInfo.companyName} If you are not entirely satisfied with
                your purchase, we&apos;re here to help.
              </p>
              <h3>Refund Eligibility</h3>
              <p>
                We offer refunds on ticket bookings based on the following
                conditions:
              </p>
              <ul>
                <li>
                  <strong>Cancellation by Customer:</strong> If you wish to
                  cancel your ticket booking, you may be eligible for a refund
                  depending on the cancellation policy of the airline, train,
                  bus, or other transportation provider. Please note that
                  cancellation fees may apply, and some bookings may be
                  non-refundable.
                </li>
                <li>
                  <strong>Cancellation by Transportation Provider:</strong> In
                  the event that the transportation provider cancels your
                  booking or changes the schedule, you may be entitled to a
                  refund according to their terms and conditions. We will assist
                  you in processing the refund as per the policies of the
                  transportation provider.
                </li>
              </ul>
              <h3>Refund Process</h3>
              <p>
                To request a refund, please contact us at
                {companyInfo.bookingEmail} with your booking details. We will
                review your request and guide you through the refund process.
              </p>
              <p>Please note the following:</p>
              <ul>
                <li>
                  Refunds will be processed to the original payment method used
                  for the booking.
                </li>
                <li>
                  Processing times for refunds may vary depending on the payment
                  method and the policies of the transportation provider. We
                  will provide you with an estimated timeline for the refund
                  process.
                </li>
                <li>
                  Any applicable cancellation fees or penalties imposed by the
                  transportation provider will be deducted from the refund
                  amount.
                </li>
                <li>
                  Once your refund is processed, it may take some time for the
                  funds to reflect in your account, depending on your bank or
                  credit card issuer.
                </li>
              </ul>
              <h3>No-Show Policy</h3>
              <p>
                If you fail to show up for your scheduled departure without
                prior cancellation, you may forfeit your eligibility for a
                refund. In such cases, the booking will be considered a no-show,
                and no refund will be issued.
              </p>
              <h3>Contact Us</h3>
              <p>
                If you have any questions about our Refund Policy, please
                contact us: {companyInfo.email}
              </p>
            </Box>
          )}
        </Container>
        <Footer value="true" />
      </Box>
    </Box>
  );
};

export default RefundPolicy;
