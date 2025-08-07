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

const AboutUs = () => {
  const [value, setValue] = useState('e');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Box sx={{ bgcolor: 'var(--white)' }}>
      <Box
        sx={{
          pb: 2,
          strong: {
            fontWeight: 600,
          },
          h2: {
            fontWeight: 500,
          },
          h3: {
            fontWeight: 500,
          },
        }}
      >
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
              {value === 'e' ? 'About Us' : 'আমাদের সম্পর্কে'}
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
            <Box pb={2}>
              <p>
                <strong>টিকেট লাগবে</strong> হল বাংলাদেশের প্রমুখ বি-টু-বি ভ্রমণ
                প্ল্যাটফর্ম, যা ভ্রমণ এজেন্টদের সর্বনিম্ন বিমান ভাড়া এবং ভ্রমণ
                এজেন্টদের সর্বোচ্চ কমিশনের সাথে শক্তিশালী করার জন্য তৈরি করা
                হয়েছে। আমরা বুঝছি আজকের প্রতিযোগিতামূলক বাজারে ভ্রমণ এজেন্টদের
                সম্মুখিন চ্যালেঞ্জগুলি। সস্তা উড়ানী পেতে সম্ভাবনা সঙ্গে সুলভ
                ফ্লাইট খুঁজতে সময়সংক্রান্ত সংঘর্ষ হতে পারে।
              </p>
              <h4>ট্রেড লাইসেন্স TRAD/DSCC/034340/2023</h4>
              <h3>এই যেখানে টিকেট লাগবে প্রবৃদ্ধি করে।</h3>
              <h3>এখানে আমাদের আলাদাভাবে তৈরি করা কী?</h3>
              <ul>
                <li>
                  <strong>অপরাজেয় মূল্য: </strong> আমরা কাটিং-এজ প্রযুক্তিতে
                  ডিলগুলি সংগ্রহ করি বিভিন্ন এয়ারলাইন এবং কনসোলিডেটর থেকে,
                  নিশ্চিত করে নিন{' '}
                  <strong>
                    বাংলাদেশের আপনার গ্রাহকদের সর্বনিম্ন উড়ানী টিকেট পেতে।
                  </strong>
                </li>
                <li>
                  <strong>লাভ সর্বোচ্চীকরণ: </strong> আমাদের শীর্ষ কমিশন কাঠামো
                  দিয়ে আপনার উত্তীর্ণ সাংঘাতিকতা <strong>উন্নত করুন।</strong>{' '}
                  আমরা আপনার কড়া কাজের প্রতি মূল্যায়নে বিশ্বাস করি।
                </li>
                <li>
                  <strong>সহজেই বুকিং প্ল্যাটফর্ম: </strong> আমাদের ব্যবহারকারী
                  বন্ধুত্বপূর্ণ প্ল্যাটফর্ম বুকিংটি সহজ করে দেয়।{' '}
                  <strong>খুঁজুন, তুলনা করুন, এবং উড়ান করুন</strong> করতে,
                  আপনার মৌলিক সময় সংরক্ষণ করুন।
                </li>
                <li>
                  <strong>24/7 সমর্থন: </strong> আমাদের প্রতিশ্রুতিবদ্ধ গ্রাহক
                  সমর্থন দল সর্বদা সাহায্য করতে উপলব্ধ থাকে। আমরা আপনার সাফল্য
                  নিশ্চিত করার জন্য এখানে আছি।
                </li>
              </ul>
              <h3>টিকেট লাগবে চয়ন করার কারণ?</h3>

              <ul>
                <li>
                  <strong>আপনার ব্যবসা বাড়ান: </strong> নতুন গ্রাহকদের আকর্ষণ
                  করুন এবং স্থিরভাবে{' '}
                  <strong>প্রতিযোগিতামূলক উড়ানী মূল্য</strong> দিয়ে সাবলীল
                  অবস্থান বজায় রাখুন।
                </li>
                <li>
                  <strong>লাভ সর্বোচ্চীকরণ: </strong> আমাদের উচ্চ কমিশন কাঠামো
                  আপনাকে অন্যান্য সময়ের প্রতি <strong>আপনার উত্তীর্ণ</strong>{' '}
                  হতে অনুমতি দেয়।
                </li>
                <li>
                  <strong>সময় সংরক্ষণ: </strong> আমাদের{' '}
                  <strong>সহজে বুকিং প্ল্যাটফর্ম</strong> বুকিং প্রক্রিয়াটি সহজ
                  করে দেয়, আপনার মৌলিক সময় ফ্রি করে দেয় যা গুরুত্বপূর্ণ -
                  আপনার গ্রাহকদের।
                </li>
                <li>
                  <strong>মানসিক শান্তি: </strong> আমাদের নির্ভরযোগ্য
                  প্ল্যাটফর্ম এবং <strong> 24/7 সমর্থন </strong> আপনার এবং আপনার
                  গ্রাহকদের জন্য একটি সহজ অভিজ্ঞতা নিশ্চিত করে।
                </li>
              </ul>

              <h3>
                টিকেট লাগবে সাথে যোগ দিন এবং বাংলাদেশে বি-টু-বি ভ্রমণ বুকিং
                ভবিষ্যতের অভিজ্ঞতা অনুভব করুন!
              </h3>
              <p>
                শুরু করার জন্য প্রস্তুত? আমাদের বি-টু-বি অংশীদার হতে সাইন আপ
              </p>
              <h3>যোগাযোগ করুন</h3>
              <p>
                আমাদের ফেরত নীতি সম্পর্কে আরও কোনও প্রশ্ন থাকলে, অনুগ্রহ করে
                আমাদের সাথে যোগাযোগ করুন: {companyInfo.email}
              </p>
            </Box>
          ) : (
            <Box pb={2}>
              <p>
                <strong>{companyInfo.companyName}</strong> is Bangladesh&apos;s
                leading B2B travel platform, designed to empower travel agents
                with the <strong>cheapest airfares</strong> and the{' '}
                <strong>highest commissions</strong>
                for travel agents. We understand the challenges travel agents
                face in today&apos;s competitive market. Finding affordable
                flights while maximizing your profits can be a time-consuming
                struggle.
              </p>
              <h4>Trade License TRAD/DSCC/034340/2023</h4>
              <h3>That&apos;s where {companyInfo.companyName} steps in.</h3>
              <h3>Here&apos;s what sets us apart:</h3>

              <ul>
                <li>
                  <strong>Unbeatable Prices: </strong>We leverage cutting-edge
                  technology to aggregate deals from various airlines and
                  consolidators, ensuring you get the{' '}
                  <strong>
                    cheapest flight tickets for your clients in Bangladesh.
                  </strong>
                </li>
                <li>
                  <strong>Maximized Commissions: </strong>{' '}
                  <strong>Boost your earning potential</strong> with our
                  industry-leading commission structure. We believe in rewarding
                  your hard work.
                </li>
                <li>
                  <strong>Seamless Booking Platform: </strong> Our user-friendly
                  platform makes booking a breeze.
                  <strong> Search, compare, and book flights</strong>{' '}
                  efficiently, saving you valuable time.
                </li>
                <li>
                  <strong>24/7 Support: </strong> Our dedicated customer support
                  team is always available to assist you with any queries.
                  We&apos;re here to ensure your success.
                </li>
              </ul>
              <h3>Why Choose {companyInfo.companyName}?</h3>

              <ul>
                <li>
                  <strong>Grow Your Business: </strong>Attract new customers and
                  retain existing ones with consistently
                  <strong>competitive airfare prices</strong>.
                </li>
                <li>
                  <strong>Increase Profitability: </strong> Our high commission
                  structure allows you to{' '}
                  <strong>maximize your earnings</strong> on every booking.
                </li>
                <li>
                  <strong>Save Time: </strong> Our{' '}
                  <strong>intuitive booking platform </strong> streamlines the
                  booking process, freeing up your time to focus on what matters
                  most - your clients.
                </li>
                <li>
                  <strong>Peace of Mind: </strong>Our reliable platform and{' '}
                  <strong> 24/7 support </strong> ensure a smooth experience for
                  you and your clients.
                </li>
              </ul>

              <h3>
                Partner with {companyInfo.companyName} and experience the future
                of B2B travel booking in Bangladesh!
              </h3>
              <p>Ready to get started? to be our B2B partner</p>
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

export default AboutUs;
