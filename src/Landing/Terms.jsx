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

const Terms = () => {
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
              {value === 'e' ? 'Terms & Conditions' : 'শর্তাদি, শর্তাবলী'}
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
                এই শর্তাবলী ("শর্তাবলী", "শর্ত এবং শর্তাবলী"){' '}
                <a href={`{https://${companyInfo.domainName}`}>
                  {companyInfo.domainName}
                </a>{' '}
                ("সেবা") দ্বারা পরিচালিত {companyInfo.companyName} ("আমরা", অথবা
                "আমাদের") আপনার সম্পর্ক নিয়ন্ত্রণ করে।
              </p>
              <p>
                আমাদের সেবা ব্যবহার করার আগে দয়া করে এই শর্তাবলী সতর্কতার সাথে
                পড়ুন।
              </p>
              <h3>অ্যাকাউন্ট</h3>
              <p>
                আমাদের সাথে একটি অ্যাকাউন্ট তৈরি করতে যখন, আপনাকে সঠিক, সম্পূর্ণ
                এবং আধুনিক তথ্য সরবরাহ করতে হবে। এটি করা না মানে শর্তাবলীর
                লঙ্ঘন, যা আমাদের সেবায় আপনার অ্যাকাউন্ট অবিলম্বে বাতিল হতে
                পারে।
              </p>
              <p>
                আপনি আপনার পাসওয়ার্ড সুরক্ষিত রাখার জন্য দায়িত্বশীল এবং আপনার
                পাসওয়ার্ড নিয়ন্ত্রণে কোনও কার্যকলাপ বা অ্যাকশনের জন্য, আপনার
                পাসওয়ার্ড, আপনার পাসওয়ার্ড আমাদের সাথে বা একটি তৃতীয় পক্ষ
                সেবা দিয়ে হয় না।
              </p>
              <p>
                আপনি কোনও তৃতীয় পক্ষের কাছে আপনার পাসওয়ার্ড ফাঁস করতে সম্মত হন
                না। আপনার অ্যাকাউন্টের অননুমোদিত ব্যবহার বা নিরাপত্তা লঙ্ঘনের
                সচেতনতা অর্জনের পর আমাদেরকে তা অবিলম্বে জানাতে হবে।
              </p>
              <h3>অন্যান্য ওয়েবসাইটের লিংক</h3>
              <p>
                আমাদের সেবা তৃতীয় পক্ষের ওয়েবসাইট বা সেবা সহ লিঙ্ক থাকতে পারে
                যা {companyInfo.companyName} দ্বারা মালিকানাধীন বা নিয়ন্ত্রিত
                নয়।
              </p>
              <p>
                {companyInfo.companyName} কোনও নিয়ন্ত্রণ নেই, এবং কোনও দায়িত্ব
                নেই যে, তৃতীয় পক্ষের ওয়েবসাইট বা সেবার বিষয়বস্তু, গোপনীয়তা
                নীতি, বা কোনও তৃতীয় পক্ষের ওয়েবসাইট বা সেবা ব্যবহারের
                অভ্যন্তরীণভাবে কোনও ক্ষতি বা ক্ষতি নির্মাণ করবে বা প্রেরিত করেছে
                বা বলা হয়েছে। আপনি আরও স্বীকার করেন এবং সম্মতি প্রদান করেন যে{' '}
                {companyInfo.companyName} অব্যাহতভাবে দায়ী বা দায়ী নয়,
                অত্যন্ততঃ বা পরোক্ষভাবে, এমন কোনও ক্ষতি বা হানি করার জন্য যা বা
                যা অনুমান করা হয় বা সংযুক্ত করা হয় যা অথবা এমন কোনও বিষয়ে বা
                যা নিয়ে ব্যবহার বা নির্ভর করা হয় যা অনুমান করা হয় তৃতীয়
                পক্ষের ওয়েবসাইট বা সেবা উপলব্ধ কোনও এমন বিষয়বস্তু, পণ্য, বা
                সেবার ব্যবহারের সম্পর্কে হয় বা অধিমান।
              </p>
              <p>
                আমরা আপনাকে প্রদত্ত নিয়ম এবং শর্তাবলী এবং যদি আপনি পরিদর্শন
                করেন তৃতীয় পক্ষের ওয়েবসাইট বা সেবার নিয়ম এবং শর্তাবলী পড়তে
                অনুরোধ করি।
              </p>
              <h3>বাতিল</h3>
              <p>
                আমরা যেকোনো কারণেই, পূর্ববর্তী নোটিশ বা দায় ছাড়াই আমাদের সেবা
                অ্যাক্সেস অবিলম্বে বাতিল বা স্থগিত করতে পারি, যদিও শর্ত লঙ্ঘন
                হলো।
              </p>
              <p>
                বাতিলের পরে, আপনার সেবা ব্যবহারের অধিকার অবিলম্বে শেষ হবে। আপনি
                যদি আপনার অ্যাকাউন্ট বাতিল করতে চান, তবে আপনি আমাদের সেবা
                ব্যবহার বন্ধ করতে পারেন।
              </p>
              <h3>আইন প্রযুক্তি</h3>
              <p>
                এই শর্তাবলী আপনার দেশের আইন অনুযায়ী আইনানুযায়ী বিবেচিত এবং
                পরিভাষিত হবে।
              </p>
              <p>
                আমাদের কোনও অধিকার বা প্রাধিকার সম্মতি দেওয়ার অভাবতে আমাদের
                কোনও অধিকার বা প্রাধিকার বিবেচনা করা হবে না। কোনও ন্যায্যতা বা
                অকার্যকরতা কোর্ট দ্বারা অবৈধ বা অবৈধ হলে, এই শর্তাবলীর অবশিষ্ট
                ধারাগুলি কার্যকর থাকবে। এই শর্তাগুলি আমাদের সেবা সম্পর্কে
                মধ্যস্থতা করে এবং আমাদের মধ্যে আগে থাকা যেকোনো চুক্তি আপডেট করে
                প্রতিস্থাপন করে।
              </p>
              <h3>পরিবর্তন</h3>
              <p>
                আমরা একমাত্র আমাদের এই শর্তাগুলি যে সময় পরিবর্তন বা
                প্রতিস্থাপনের অধিকার সংরক্ষণ করি। যদি একটি প্রতিবেদন
                গুরুত্বপূর্ণ হয়, আমরা যত্ন করে প্রয়াত নতুন শর্তার আগে অনুমান
                প্রদান করব। কোনও প্রতিষ্ঠান একটি গুরুত্বপূর্ণ পরিবর্তন যে কি তা
                আমাদের একমাত্র বিবেচনায় নির্ধারণ করা হবে।
              </p>
              <p>
                যে কোনও পরিবর্তনের পরেও আমাদের সেবা অ্যাক্সেস বা ব্যবহার চালিয়ে
                যাওয়ার সাথে আপনি মেনে নিতে সম্মত হন যত্ন করে। আপনি যদি নতুন
                শর্তাবলীতে সম্মত না হন, তবে দয়া করে সেবা ব্যবহার বন্ধ করুন।
              </p>
              <h3>যোগাযোগ করুন</h3>
              <p>
                আপনার যদি এই শর্তাগুলি সম্পর্কে কোনও প্রশ্ন থাকে, তবে দয়া করে
                আমাদের সাথে যোগাযোগ করুন।{' '}
                <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
              </p>
            </Box>
          ) : (
            <Box>
              <p>
                These Terms and Conditions ("Terms", "Terms & Conditions")
                govern your relationship with{' '}
                <a href={`{https://${companyInfo.domainName}`}>
                  {companyInfo.domainName}
                </a>{' '}
                (the "Service") operated by {companyInfo.companyName} ("us",
                "we", or "our").
              </p>
              <p>
                Please read these Terms & Conditions carefully before using our
                Service.
              </p>
              <h3>Accounts</h3>
              <p>
                When you create an account with us, you must provide us with
                accurate, complete, and up-to-date information. Failure to do so
                constitutes a breach of the Terms, which may result in immediate
                termination of your account on our Service.
              </p>
              <p>
                You are responsible for safeguarding the password that you use
                to access the Service and for any activities or actions under
                your password, whether your password is with our Service or a
                third-party service.
              </p>
              <p>
                You agree not to disclose your password to any third party. You
                must notify us immediately upon becoming aware of any breach of
                security or unauthorized use of your account.
              </p>
              <h3>Links to Other Websites</h3>
              <p>
                Our Service may contain links to third-party websites or
                services that are not owned or controlled by{' '}
                {companyInfo.companyName}
              </p>
              <p>
                {companyInfo.companyName} has no control over, and assumes no
                responsibility for, the content, privacy policies, or practices
                of any third-party websites or services. You further acknowledge
                and agree that {companyInfo.companyName} shall not be
                responsible or liable, directly or indirectly, for any damage or
                loss caused or alleged to be caused by or in connection with the
                use of or reliance on any such content, goods, or services
                available on or through any such websites or services.
              </p>
              <p>
                We strongly advise you to read the terms and conditions and
                privacy policies of any third-party websites or services that
                you visit.
              </p>
              <h3>Termination</h3>
              <p>
                We may terminate or suspend access to our Service immediately,
                without prior notice or liability, for any reason whatsoever,
                including without limitation if you breach the Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately
                cease. If you wish to terminate your account, you may simply
                discontinue using the Service.
              </p>
              <h3>Governing Law</h3>
              <p>
                These Terms shall be governed and construed in accordance with
                the laws of [your country], without regard to its conflict of
                law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms
                will not be considered a waiver of those rights. If any
                provision of these Terms is held to be invalid or unenforceable
                by a court, the remaining provisions of these Terms will remain
                in effect. These Terms constitute the entire agreement between
                us regarding our Service and supersede and replace any prior
                agreements we might have had between us regarding the Service.
              </p>
              <h3>Changes</h3>
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will try to provide at least 30 days' notice prior to any new
                terms taking effect. What constitutes a material change will be
                determined at our sole discretion.
              </p>
              <p>
                By continuing to access or use our Service after those revisions
                become effective, you agree to be bound by the revised terms. If
                you do not agree to the new terms, please stop using the
                Service.
              </p>
              <h3>Contact Us</h3>
              <p>
                If you have any questions about these Terms, please contact us.{' '}
                <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
              </p>
            </Box>
          )}
        </Container>
        <Footer value="true" />
      </Box>
    </Box>
  );
};

export default Terms;
