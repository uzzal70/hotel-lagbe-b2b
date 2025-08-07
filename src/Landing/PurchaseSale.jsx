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

const PurchaseSale = () => {
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
              {value === 'e'
                ? 'Purchase & Sale Terms'
                : 'ক্রয় ও বিক্রয় শর্তাবলী'}
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
              <p>সর্বশেষ আপডেট: 1 এপ্রিল 2024</p>
              <p>
                এই ক্রয় এবং বিক্রয় শর্তাদিবস ("শর্তাবলী") টিকেট এবং সংশ্লিষ্ট
                সেবাগুলি ("সেবাসমূহ") টিকেট লাগবে লিমিটেড দ্বারা প্রদান করা হয়
                যা{' '}
                <a href={`{https://${companyInfo.domainName}`}>
                  {companyInfo.domainName}
                </a>{' '}
                ("আমরা", "আমরা", অথবা "আমাদের") ওয়েবসাইট মাধ্যমে ("সাইট")।
              </p>
              <p>
                আমাদের সাইটে অ্যাক্সেস করে বা ব্যবহার করে এবং আমাদের থেকে টিকেট
                বা সেবা ক্রয় করে, আপনি এই শর্তাদিবস দ্বারা বাধা প্রাপ্ত হওয়ার
                জন্য সম্মতি প্রদান করেন। আপনি যদি এই শর্তাবলীতে সম্মত না হন, তবে
                আপনি আমাদের সাইটে অ্যাক্সেস করতে বা আমাদের থেকে টিকেট বা সেবা
                ক্রয় করতে পারবেন না।
              </p>
              <h3>টিকেট ক্রয়</h3>
              <p>
                আমাদের সাইটে টিকেট বা সেবা ক্রয় করার সময়, আপনি বুকিং এর জন্য
                সঠিক, সম্পূর্ণ এবং হালনাগাদ তথ্য প্রদান করার সম্মতি দিচ্ছেন।
                আপনি আরো যোগাযোগ প্রদানকারী দ্বারা যে কোনও শর্তাবলী অনুমোদন
                করতে সম্মত হন, যেমন ব্যাগেজ নীতি, চেক-ইন প্রয়োজনীয়তা এবং
                অন্যান্য নিয়ম ও বিধি।
              </p>
              <h3>মূল্য এবং পেমেন্ট</h3>
              <p>
                আমাদের সাইটে প্রদর্শিত টিকেট এবং সেবার মূল্য পরিবর্তনের বাধা
                সাপেক্ষে। আমরা যে কোনও সময়ে মূল্য তথ্য পরিবর্তন বা আপডেট করার
                অধিকার সংরক্ষণ করি। সমস্ত মূল্যগুলি প্রযোজ্য কর করে নিখুঁত করে
                আদায় করা হয়, যদিও অন্যথায় উল্লিখিত নেই।
              </p>
              <p>
                টিকেট এবং সেবার জন্য পেমেন্ট করতে হবে আমাদের সাইটে প্রযোজ্য
                পেমেন্ট পদ্ধতিগুলি ব্যবহার করে বুকিং সময়ে। আপনার পেমেন্ট তথ্য
                প্রদান করে আপনি আমাদেরকে আপনার নির্বাচিত পেমেন্ট পদ্ধতিতে মোট
                বিল আদায় করার অনুমতি দিচ্ছেন।
              </p>
              <h3>টিকেট বিতরণ</h3>
              <p>
                আপনার বুকিং এবং পেমেন্ট সম্পন্ন করার পরে, আপনি আপনার বুকিংর
                বিস্তারিত নিশ্চিতকরণ ইমেল প্রাপ্ত করবেন। পরিবহন প্রদানকারীর উপর
                নির্ভর করে, আপনি ইলেকট্রনিক টিকেট বা চেক-ইন বা বোর্ডিংর জন্য
                ব্যবহার করতে পারেন এমন বুকিং রেফারেন্স প্রাপ্ত করতে পারেন।
              </p>
              <h3>বাতিল এবং পরিবর্তন</h3>
              <p>
                বাতিল এবং পরিবর্তন নীতির পরিবর্তন পরিবহণ প্রদানকারীর এবং
                ক্রয়কৃত টিকেটের ধরণ অনুসারে পরিবর্তিত হয়। আপনার বুকিংর
                শর্তাবলী দেখার জন্য, বাতিল ফি, প্রত্যাশিত ফেরত অর্জনের অধিকারিতা
                এবং পরিবর্তন ফি সম্পর্কে তথ্যের জন্য দয়া করে দেখুন।
              </p>
              <p>
                আপনি যদি আপনার বুকিং বাতিল বা পরিবর্তন করতে ইচ্ছুক হন, তবে
                সম্ভবত সর্বোত্তম দ্রুত আমাদের সাথে যোগাযোগ করুন। পরিবহণ
                প্রদানকারীর নীতিমালা অনুযায়ী বাতিল বা পরিবর্তনের প্রক্রিয়ায়
                আপনাকে সহায়তা করব।
              </p>
              <h3>দায়িত্ব সীমাবদ্ধতা</h3>
              <p>
                আমরা কেবলমাত্র আপনার এবং পরিবহণ প্রদানকারীর মধ্যে একটি মধ্যস্থ
                হিসাবে টিকেট এবং সেবার ক্রয়ের জন্য কাজ করি। আমরা পরিবহণ
                প্রদানকারীর ক্রিয়াকলাপ বা অকর্তন, মেয়াদ শেষ, বাতিল বা আপনার
                প্রণালীতে পরিবর্তনের জন্য দায়ী নয়, সীমাবদ্ধ হতে হবে।
              </p>
              <p>
                কোনও ঘটনায় {companyInfo.companyName} যে কোনও সরাসরি, পরোক্ষ,
                যাত্রীদের দ্বারা প্রদত্ত, বিশেষ, বা পরিণামবাহী ক্ষতি উত্থান করতে
                বা যে কোনও ধরনের সাইটে টিকেট বা সেবার ব্যবহারের সাথে সংযোগিত হয়
                না।
              </p>
              <h3>আইন প্রযুক্তি</h3>
              <p>
                এই শর্তাগুলি আপনার দেশের আইন অনুযায়ী আইনানুযায়ী বিবেচিত এবং
                পরিভাষিত হবে।
              </p>
              <h3>যোগাযোগ করুন</h3>
              <p>
                যদি আপনার কোনও প্রশ্ন থাকে এই ক্রয় এবং বিক্রয় শর্তাগুলি
                সম্পর্কে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন:{' '}
                <a href={`mailto:${companyInfo.bookingEmail}`}>
                  {companyInfo.bookingEmail}
                </a>
              </p>
            </Box>
          ) : (
            <Box>
              <p>Last updated: 1 April 2024</p>
              <p>
                These Purchase and Sale Terms ("Terms") govern the purchase and
                sale of tickets and related services ("Services") offered by
                {companyInfo.companyName} ("us", "we", or "our") through our
                website
                <a href={`https://${companyInfo.domainName}`}>
                  {companyInfo.domainName}
                </a>{' '}
                (the "Site").
              </p>
              <p>
                By accessing or using the Site and purchasing tickets or
                Services from us, you agree to be bound by these Terms. If you
                do not agree to these Terms, you may not access or use the Site
                or purchase tickets or Services from us.
              </p>
              <h3>Ticket Purchase</h3>
              <p>
                When you purchase tickets or Services through our Site, you
                agree to provide accurate, complete, and up-to-date information
                for the booking. You also agree to comply with any terms and
                conditions imposed by the transportation provider, including but
                not limited to baggage policies, check-in requirements, and
                other rules and regulations.
              </p>
              <h3>Pricing and Payment</h3>
              <p>
                The prices for tickets and Services displayed on our Site are
                subject to change without notice. We reserve the right to modify
                or update pricing information at any time. All prices are
                inclusive of applicable taxes and fees, unless otherwise stated.
              </p>
              <p>
                Payment for tickets and Services must be made at the time of
                booking using the payment methods available on our Site. By
                providing your payment information, you authorize us to charge
                the total amount due to your selected payment method.
              </p>
              <h3>Ticket Delivery</h3>
              <p>
                After completing your booking and payment, you will receive a
                confirmation email with details of your booking. Depending on
                the transportation provider, you may also receive electronic
                tickets or booking references that you can use for check-in or
                boarding.
              </p>
              <h3>Cancellations and Changes</h3>
              <p>
                Cancellation and change policies vary depending on the
                transportation provider and the type of ticket purchased. Please
                review the terms and conditions of your booking for information
                on cancellation fees, refund eligibility, and change fees.
              </p>
              <p>
                If you wish to cancel or change your booking, please contact us
                as soon as possible. We will assist you in processing the
                cancellation or change according to the policies of the
                transportation provider.
              </p>
              <h3>Limitation of Liability</h3>
              <p>
                We act solely as an intermediary between you and the
                transportation provider for the purchase of tickets and
                Services. We are not responsible for the actions or omissions of
                the transportation provider, including but not limited to
                delays, cancellations, or changes to your itinerary.
              </p>
              <p>
                In no event shall {companyInfo.companyName} be liable for any
                direct, indirect, incidental, special, or consequential damages
                arising out of or in any way connected with the purchase or use
                of tickets or Services through our Site.
              </p>
              <h3>Governing Law</h3>
              <p>
                These Terms shall be governed and construed in accordance with
                the laws of Bangladesh, without regard to its conflict of law
                provisions.
              </p>
              <h3>Contact Us</h3>
              <p>
                If you have any questions about these Purchase and Sale Terms,
                please contact us:
                <a href={`mailto:${companyInfo.bookingEmail}`}>
                  {companyInfo.bookingEmail}
                </a>
              </p>
            </Box>
          )}
        </Container>
        <Footer value="true" />
      </Box>
    </Box>
  );
};

export default PurchaseSale;
