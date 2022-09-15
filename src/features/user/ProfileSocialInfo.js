import React from "react";
import { styled } from "@mui/material/styles";
import { Link, Card, CardHeader, Stack, Box } from "@mui/material";
import {
  LinkedIn,
  Instagram,
  Facebook,
  Twitter,
 
} from "@mui/icons-material";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
  
}));

function ProfileSocialInfo({ profile }) {
  const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;

  const SOCIALS = [
    {
      name: "LinkedIn",
      icon: (
        <IconStyle color = "primary.main">
          <LinkedIn />
        </IconStyle>
      ),
      href: linkedinLink,
    },
    {
      name: "Twitter",
      icon: (
        <IconStyle color = "primary.main">
          <Twitter />
        </IconStyle>
      ),
      href: twitterLink,
    },
    {
      name: "Facebook",
      icon: (
        <IconStyle color = "primary.main">
          <Facebook />
        </IconStyle>
      ),
      href: facebookLink,
    },
    {
      name: "Instagram",
      icon: (
        <IconStyle color = "primary.main">
          <Instagram />
        </IconStyle>
      ),
      href: instagramLink,
    },
  ];
  return (
    <Card>
      <CardHeader title="Social" />
      <Stack spacing={2} sx={{ p: 3 }}>
        {SOCIALS.map((link) => (
          <Stack key={link.name} direction="row" alignItems="center">
            {link.icon}
            <Link component="span" variant="body2" color="text.primary" noWrap>
              {link.href}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

export default ProfileSocialInfo;
