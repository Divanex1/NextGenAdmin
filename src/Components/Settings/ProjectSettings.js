import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getData, postData } from '../Services/api';

const ProjectSettings = () => {
    const [settings, setSettings] = useState({
        customer_support_email: '',
        customer_support_number: '',
        about: '',
        social_links: [],
        logo: '',
        footer_logo: ''
    });
    const [socialLinks, setSocialLinks] = useState([{ url: '', icon: '' }]);
    const [logo, setLogo] = useState(null);
    const [footerLogo, setFooterLogo] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch settings when the component is mounted

    const fetchSettings = async () => {
        try {
            const res = await getData('/admin/project-setting'); // Make sure to use the correct API endpoint
            if (res.success) {
                setSettings(res.data);
                setSocialLinks(res.data.social_links);
            }

        } catch (error) {
            console.error("Error fetching settings:", error);
            toast.error("Failed to fetch project settings.");
        }
    };
    useEffect(() => {
        fetchSettings();
    }, []);

    // Handle input change for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: value
        }));
    };

    // Handle social link input change
    const handleSocialLinkChange = (index, e) => {
        const { name, value } = e.target;
        const newSocialLinks = [...socialLinks];
        newSocialLinks[index][name] = value;
        setSocialLinks(newSocialLinks);
    };

    // Handle adding/removing social links
    const addSocialLink = () => {
        setSocialLinks([...socialLinks, { url: '', icon: '' }]);
    };

    const removeSocialLink = (index) => {
        const newSocialLinks = socialLinks.filter((_, i) => i !== index);
        setSocialLinks(newSocialLinks);
    };

    // Handle file changes
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (type === 'logo') setLogo(file);
        if (type === 'footer_logo') setFooterLogo(file);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('customer_support_email', settings.customer_support_email);
        formData.append('customer_support_number', settings.customer_support_number);
        formData.append('about', settings.about);

        socialLinks.forEach((link, index) => {
            formData.append(`social_links[${index}][url]`, link.url);
            formData.append(`social_links[${index}][icon]`, link.icon);
        });

        if (logo) formData.append('logo', logo);
        if (footerLogo) formData.append('footer_logo', footerLogo);

        try {
            const res = await postData('/admin/project-setting', formData);
            if (res.success) {
                toast.success("Settings updated successfully!");
                fetchSettings()
            } else {
                toast.error("Error updating settings.");
            }
        } catch (error) {
            console.error("Error submitting settings:", error);
            toast.error("Failed to update project settings.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Project Settings</h1>
            <form onSubmit={handleSubmit}>
                {/* Customer Support Email */}
                <div className="mb-3">
                    <label htmlFor="customer_support_email" className="form-label">Customer Support Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="customer_support_email"
                        name="customer_support_email"
                        value={settings.customer_support_email}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Customer Support Number */}
                <div className="mb-3">
                    <label htmlFor="customer_support_number" className="form-label">Customer Support Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="customer_support_number"
                        name="customer_support_number"
                        value={settings.customer_support_number}
                        onChange={handleInputChange}
                    />
                </div>

                {/* About Section */}
                <div className="mb-3">
                    <label htmlFor="about" className="form-label">About</label>
                    <textarea
                        className="form-control"
                        id="about"
                        name="about"
                        rows="4"
                        value={settings.about}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Social Links */}
                <div className="mb-3">
                    <h5>Social Links</h5>
                    {socialLinks.map((link, index) => (
                        <div key={index} className="mb-2 d-flex">
                            <input
                                type="url"
                                className="form-control me-2"
                                name="url"
                                placeholder="URL"
                                value={link.url}
                                onChange={(e) => handleSocialLinkChange(index, e)}
                            />
                            <input
                                type="text"
                                className="form-control me-2"
                                name="icon"
                                placeholder="Icon (Font Awesome)"
                                value={link.icon}
                                onChange={(e) => handleSocialLinkChange(index, e)}
                            />
                            <button type="button" className="btn btn-danger" onClick={() => removeSocialLink(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={addSocialLink}>Add Social Link</button>
                </div>

                <div className="mb-3">
                    <label htmlFor="logo" className="form-label">Logo</label>
                    <input
                        type="file"
                        className="form-control"
                        id="logo"
                        onChange={(e) => handleFileChange(e, 'logo')}
                    />
                    {settings.logo && (
                        <div>
                            <img src={settings.logo} alt="Footer Logo" width="200" height="100" />
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="footer_logo" className="form-label">Footer Logo</label>
                    <input
                        type="file"
                        className="form-control"
                        id="footer_logo"
                        onChange={(e) => handleFileChange(e, 'footer_logo')}
                    />
                    {settings.footer_logo && (
                        <div>
                            <img src={settings.footer_logo} alt="Footer Logo" width="200" height="100" />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Updating...' : 'Save Settings'}
                </button>
            </form>
        </div>
    );
};

export default ProjectSettings;
