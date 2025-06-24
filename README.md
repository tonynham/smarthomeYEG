# Smart Home YEG by Tony - Website

A modern, professional website for smart home automation services in Edmonton, Alberta.

## Features

- 🏠 **Modern Design**: Clean, professional layout with smooth animations
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast Loading**: Optimized for performance
- 🎨 **Interactive**: Hover effects, smooth scrolling, and engaging animations
- 📧 **Contact Form**: Easy consultation request system
- 🌟 **SEO Optimized**: Proper meta tags and structure

## Services Highlighted

- LED Lighting Systems
- Google Home Integration & Custom Coding
- Smart Switches & Controls
- Smart Doorbells
- Home Security Systems
- Hardware Research & Sourcing

## Customization Guide

### 1. Update Contact Information

**In `index.html`:**
- Replace `(555) 123-4567` with your actual phone number
- Replace `tony@smarthomeyeg.com` with your actual email address

**In `script.js`:**
- Update the email address in the `mailtoLink` variable
- Update the phone number in the click-to-call alert message

### 2. Add Your Professional Photo

Replace the profile placeholder in the About section:
1. Add your photo to the project folder (e.g., `tony-photo.jpg`)
2. In `index.html`, find the `profile-placeholder` div and replace it with:
```html
<div class="about-image">
    <img src="tony-photo.jpg" alt="Tony - Smart Home Expert" class="profile-photo">
</div>
```
3. Add CSS styling for the photo in `styles.css`:
```css
.profile-photo {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
```

### 3. Update Business Details

- Modify service descriptions in the Services section
- Update the About section with your personal story and experience
- Adjust the service area if you serve beyond Edmonton

### 4. Add Real Testimonials (Optional)

You can add a testimonials section between Services and About:
```html
<section class="testimonials">
    <div class="container">
        <div class="section-header">
            <h2>What Our Customers Say</h2>
            <p>Real feedback from satisfied smart home owners</p>
        </div>
        <!-- Add testimonial cards here -->
    </div>
</section>
```

### 5. SEO Improvements

- Update the title and meta description in `index.html`
- Add Google Analytics code before closing `</head>` tag
- Consider adding structured data markup for local business

## Deployment Options

### Option 1: Static Hosting (Recommended)
- **Netlify**: Drag and drop the folder to netlify.com
- **Vercel**: Import from GitHub repository
- **GitHub Pages**: Push to GitHub and enable Pages

### Option 2: Traditional Web Hosting
- Upload all files to your hosting provider's public folder
- Ensure the main file is named `index.html`

### Option 3: Local Testing
Open `index.html` in your web browser to test locally.

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Tips

1. **Optimize Images**: If you add images, compress them using tools like TinyPNG
2. **Enable Compression**: Configure your hosting to enable GZIP compression
3. **Use CDN**: Consider using a CDN for faster global loading

## Technical Features

- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Animations**: Smooth transitions and hover effects
- **Vanilla JavaScript**: No dependencies for faster loading
- **Font Awesome Icons**: Professional iconography
- **Google Fonts**: Modern typography with Inter font
- **Form Validation**: Client-side validation for better UX

## Maintenance

- Update contact information as needed
- Add new services or modify existing ones
- Keep the design fresh with seasonal updates
- Monitor form submissions and respond promptly

## Support

For technical issues or customization help, consider:
1. Local web developers in Edmonton
2. Online freelance platforms
3. Web development communities

---

**Built for Smart Home YEG by Tony** - Making Edmonton homes smarter, one automation at a time! 🏠✨ 