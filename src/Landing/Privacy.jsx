import {
  Box,
  Container,
  FormControlLabel,
  Radio,
  Stack,
  Typography,
} from '@mui/material';
import LandingHeader from './LandingHeader';
import { useState } from 'react';
import Footer from './Footer';
import companyInfo from '../common/companyInfo';

const Privacy = () => {
  // Recursive function to render JSON data
  const renderData = (data) => {
    return Object.keys(data).map((key) => {
      if (typeof data[key] === 'object') {
        return (
          <div key={key} style={{ margin: '10px 0' }}>
            {renderData(data[key])}
          </div>
        );
      } else {
        return (
          <div key={key} style={{ margin: '10px 0' }}>
            <strong>{key}:</strong> {data[key]}
          </div>
        );
      }
    });
  };
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
              {value === 'e' ? 'Privacy Policy' : 'প্রাইভেসি পলিসি'}
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
                টিকেট লাগবে লিমিটেড ("আমরা", "আমরা", বা "আমাদের"){' '}
                <a href={`{https://${companyInfo.domainName}`}>
                  {companyInfo.domainName}
                </a>{' '}
                (এখানে "সাইট") পরিচালনা করে। এই পৃষ্ঠাটি আমাদের নীতিসমূহ
                সম্পর্কে আপনাকে জানিয়ে দেয় যা সাইটের ব্যবহারকারীদের থেকে
                পার্সোনাল তথ্য সংগ্রহ, ব্যবহার, এবং ফাঁস করতে পারে এমন আমাদের
                নীতি সম্পর্কে আপনাকে সচেতন করে।
              </p>
              <p>
                আমরা আপনার ব্যবহারের মাধ্যমে শুধুমাত্র সাইট প্রদান এবং উন্নতি
                করার জন্য আপনার ব্যক্তিগত তথ্য ব্যবহার করি। সাইট ব্যবহার করে
                আপনি এই নীতিমালায় তথ্য সংগ্রহ এবং ব্যবহারে সম্মত হন।
              </p>
              <h3>তথ্য সংগ্রহ এবং ব্যবহার</h3>
              <p>
                আমাদের সাইট ব্যবহার করার সময়, আমরা আপনার থেকে নিশ্চিত ব্যক্তিগত
                তথ্য সংগ্রহ করতে আবার আবেগপ্রদান করতে আবার আবার প্রশ্ন করতে পারি
                যে আপনাকে অভিভাবক করতে পারে অথবা চিহ্নিত করতে পারে ব্যক্তিগত
                সনাক্তকরণযুক্ত তথ্য। ব্যক্তিগত সনাক্তকরণযুক্ত তথ্য অন্তর্নিহিত
                হতে পারে, কিন্তু এটি সীমাবদ্ধ নয়:
              </p>
              <ul>
                <li>নাম</li>
                <li>ইমেল ঠিকানা</li>
                <li>মেইলিং ঠিকানা</li>
                <li>ফোন নম্বর</li>
                <li>আমাদের সাথে স্বেচ্ছাযোগে প্রদান করা অন্যান্য তথ্য</li>
              </ul>
              <h3>ব্যক্তিগত তথ্যের ব্যবহার</h3>
              <p>
                আমরা আপনার থেকে সংগ্রহ করা ব্যক্তিগত তথ্য বিভিন্ন উদ্দেশ্যে
                ব্যবহার করতে পারি, যেমনঃ
              </p>
              <ul>
                <li>টিকেটিং সেবা প্রদান</li>
                <li>আপনার লেনদেন প্রসেস করা</li>
                <li>আমাদের সেবা সংক্রান্ত পরিবর্তনের বিজ্ঞপ্তি দেওয়া</li>
                <li>গ্রাহক সমর্থন প্রদান</li>
                <li>
                  আমাদের সেবা উন্নত করতে আমরা অনুসন্ধান বা মৌলিক তথ্য সংগ্রহ
                  করতে পারি
                </li>
                <li>আমাদের সেবার ব্যবহার মনিটর করা</li>
                <li>প্রযুক্তিগত সমস্যা চেনার, প্রতিরোধ করার এবং ঠিক করার</li>
                <li>
                  আপনি যদি এমন যেন প্রচারিত এবং মার্কেটিং যোগাযোগ প্রেরণ করুন
                  তবে আপনাকে এই যোগাযোগগুলি প্রাপ্ত করতে ইচ্ছুক হলে
                </li>
              </ul>
              <h3>যোগাযোগ</h3>
              <p>
                আমরা আপনার ব্যক্তিগত তথ্য ব্যবহার করতে পারি আপনার সাথে যোগাযোগ
                করতে নিউজলেটার, মার্কেটিং বা প্রচারণামূলক উপাদান, এবং অন্যান্য
                তথ্য। আপনি যদি আমাদের কাছ থেকে যে কোনও, অথবা সমস্ত, এই
                যোগাযোগগুলি প্রাপ্ত করা থেকে বাধা দিতে চান, তবে আপনি যেখানে আপনি
                কোনও ইমেল প্রেরণ করতে পানি, অনুসরণ করতে পারেন অথবা সে ইমেলে
                প্রদত্ত নির্দেশনা অনুযায়ী।
              </p>
              <h3>কুকিজ</h3>
              <p>
                কুকিজ ছোট পরিমাণের তথ্য ফাইল, যা একটি অজানা অদ্বিতীয় অদ্যাবধিক
                পরিচয়কারী সনাক্তকরণ অন্তর্নিহিত করতে পারে। কুকিজ আপনার
                ওয়েবসাইট থেকে আপনার ব্রাউজারে প্রেরিত এবং আপনার কম্পিউটারের
                হার্ড ড্রাইভে সংরক্ষিত হতে পারে।
              </p>
              <p>
                অনেক সাইটের মতো, আমরা তথ্য সংগ্রহ করতে কুকিজ ব্যবহার করি। আপনি
                আপনার ব্রাউজারকে সমস্ত কুকিজ প্রত্যাখ্যান করতে বা কুকিজ প্রেরণ
                হয়েছে অথবা না প্রদর্শন করতে নির্দেশ করতে পারেন। তবে, যদি আপনি
                কুকিজ গ্রহণ না করেন, তবে আপনি আমাদের সাইটের কিছু অংশ ব্যবহার
                করতে পারেন না।
              </p>
              <h3>নিরাপত্তা</h3>
              <p>
                আপনার ব্যক্তিগত তথ্যের নিরাপত্তাটি আমাদের জন্য গুরুত্বপূর্ণ,
                কিন্তু মনে রাখা যাক যে, ইন্টারনেটের মাধ্যমে বা ইলেক্ট্রনিক
                স্টোরেজের মাধ্যমে যে কোনও ট্রান্সমিশনের কোনও পদ্ধতি 100% নিরাপদ
                নয়। আমরা আপনার ব্যক্তিগত তথ্য সুরক্ষার জন্য বাণিজ্যিকভাবে
                গুরুত্বপূর্ণ পদক্ষেপ নিতে চেষ্টা করি, তবে আমরা এর পূর্ণাঙ্গ
                নিরাপত্তার নিশ্চিততা দিতে পারি না।
              </p>
              <h3>এই গোপনীয়তা নীতির পরিবর্তন</h3>
              <p>
                এই গোপনীয়তা নীতি প্রযোজ্য [তারিখ সন্তুষ্ট তারিখ] হিসাবে
                প্রভাবশীল হয় এবং ভবিষ্যতে এর প্রাবধানের যে কোনও পরিবর্তনের সাথে
                কার্যকর থাকবে, যা এই পৃষ্ঠায় পোস্ট করা পরে অবিলম্বে কার্যকর
                হবে।
              </p>
              <p>
                আমরা সর্বদা আমাদের গোপনীয়তা নীতি হালনাগাদ বা পরিবর্তন করতে
                অধিকার রাখি এবং আপনাকে এই গোপনীয়তা নীতি নিয়মিতভাবে পরীক্ষা করার
                জন্য আহ্বান করছি। আমাদের গোপনীয়তা নীতির যে কোনও পরিবর্তনের পরে
                আপনার সেবার ব্যবহার চালিয়ে যাওয়া অধিকৃত হওয়ার পরিপ্রেক্ষিতে।
                আমরা আপনাকে এই পৃষ্ঠায় গোপনীয়তা নীতির যে কোনও সংশোধনের পরে
                পোস্ট করার পরে আপনার সাথে বিবেচনা করার অনুমতি প্রদান করা আপনার
                অনুমতি দেওয়ার জন্য।
              </p>
              <p>
                যদি আমরা এই গোপনীয়তা নীতিতে কোনও প্রধান পরিবর্তন করি, তবে আমরা
                আপনাকে আমরা আপনাকে এমন ইমেল ঠিকানা দিয়ে বা আমাদের ওয়েবসাইটে
                গোপনীয়তা নীতি মধ্যে একটি প্রমুখ নোটিশ প্রদান করতে হবে।
              </p>
              <h3>যোগাযোগ করুন</h3>
              <p>
                যদি আপনার এই গোপনীয়তা নীতি সম্পর্কে কোনও প্রশ্ন থাকে, অনুগ্রহ
                করে আমাদের সাথে{' '}
                <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
                যোগাযোগ করুন।
              </p>
            </Box>
          ) : (
            <Box>
              <p>Last updated: 1 April 2024</p>
              <p>
                {companyInfo.companyName} ("us", "we", or "our") operates{' '}
                <a href={`{https://${companyInfo.domainName}`}>
                  {companyInfo.domainName}
                </a>{' '}
                (the "Site"). This page informs you of our policies regarding
                the collection, use, and disclosure of Personal Information we
                receive from users of the Site.
              </p>
              <p>
                We use your Personal Information only for providing and
                improving the Site. By using the Site, you agree to the
                collection and use of information in accordance with this
                policy.
              </p>
              <h3>Information Collection And Use</h3>
              <p>
                While using our Site, we may ask you to provide us with certain
                personally identifiable information that can be used to contact
                or identify you. Personally identifiable information may
                include, but is not limited to:
              </p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Mailing address</li>
                <li>Phone number</li>
                <li>
                  Any other information that you voluntarily provide to us
                </li>
              </ul>
              <h3>Use of Personal Information</h3>
              <p>
                We may use the Personal Information collected from you for
                various purposes, including but not limited to:
              </p>
              <ul>
                <li>Providing Ticketing Service</li>
                <li>Processing your transactions</li>
                <li>Notifying you about changes to our Service</li>
                <li>Providing customer support</li>
                <li>
                  Gathering analysis or valuable information so that we can
                  improve our Service
                </li>
                <li>Monitoring the usage of our Service</li>
                <li>Detecting, preventing and addressing technical issues</li>
                <li>
                  Sending you promotional and marketing communications if you
                  have opted in to receive such communications
                </li>
              </ul>
              <h3>Communications</h3>
              <p>
                We may use your Personal Information to contact you with
                newsletters, marketing or promotional materials, and other
                information that pertains to our services. You can opt out of
                receiving any, or all, of these communications from us by
                following the unsubscribe link or instructions provided in any
                email we send.
              </p>
              <h3>Cookies</h3>
              <p>
                Cookies are files with small amounts of data, which may include
                an anonymous unique identifier. Cookies are sent to your browser
                from a web site and stored on your computer's hard drive.
              </p>
              <p>
                Like many sites, we use cookies to collect information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent. However, if you do not accept cookies,
                you may not be able to use some portions of our Site.
              </p>
              <h3>Security</h3>
              <p>
                The security of your Personal Information is important to us,
                but remember that no method of transmission over the Internet,
                or method of electronic storage, is 100% secure. While we strive
                to use commercially acceptable means to protect your Personal
                Information, we cannot guarantee its absolute security.
              </p>
              <h3>Changes To This Privacy Policy</h3>
              <p>
                This Privacy Policy is effective as of [Insert Date] and will
                remain in effect except with respect to any changes in its
                provisions in the future, which will be in effect immediately
                after being posted on this page.
              </p>
              <p>
                We reserve the right to update or change our Privacy Policy at
                any time and you should check this Privacy Policy periodically.
                Your continued use of the Service after we post any
                modifications to the Privacy Policy on this page will constitute
                your acknowledgment of the modifications and your consent to
                abide and be bound by the modified Privacy Policy.
              </p>
              <p>
                If we make any material changes to this Privacy Policy, we will
                notify you either through the email address you have provided
                us, or by placing a prominent notice on our website.
              </p>
              <h3>Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us.{' '}
                <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
              </p>
            </Box>
          )}
        </Container>
      </Box>
      <Footer value="true" />
    </Box>
  );
};

export default Privacy;
