import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Resizer from 'react-image-file-resizer';
import html2canvas from 'html2canvas';
import Cropper from './Cropper';
import Modal from 'react-modal';
import safiyaLogo from "./assets/safiya-logo.png";
import telephone from "./assets/landphone.png";
import website from "./assets/website.png";




const EmailSignature = (props) => {


    const [name, setName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState(' Safiya Travels Pvt Ltd');
    const [line1, setLine1] = useState('39/4071B, Safiya Tower');
    const [line2, setLine2] = useState('Near Ravipuram Temple, Ravipuram Rd.');
    const [line3, setLine3] = useState('Kochi, Ernakulam,Kerala,India, 682016');
    const [officeLandline, setOfficeLandline] = useState('0484 4270700');
    const [officePhone, setOfficePhone] = useState('+91 8129778244');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageCropped, setImageCropped] = useState(true);
    const [croppedImageUrl, setCroppedImageUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'jobTitle':
                setJobTitle(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'whatsapp':
                setWhatsapp(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'company':
                setCompany(value);
                break;
            case 'officeLandline':
                setOfficeLandline(value);
                break;
            case 'officephone':
                setOfficePhone(value);
                break;
            case 'line1':
                setLine1(value);
                break;
            case 'line2':
                setLine2(value);
                break;
            case 'line3':
                setLine3(value);
                break;
            case 'photo':
                const selectedFile = event.target.files[0];
                setImage(selectedFile);
                break;
            default:
                break;
        }
    };




    const generateSignature = () => {
        let signatureText = `
        <div class="col-7" style="font-family: Poppins;">
            <div id="signature-container" class="card" align:center;  >
                <div class="card-body">
                    <div >
                        <table width="600" cellspacing="0" ; cellpadding="0" border="0">
                            <tbody >
                                <tr >
                                ${croppedImageUrl ? `
                                <td style="padding-right:25px;padding-bottom:40px; padding-left:20px;" >
                                    <div class="image-container"; style="width: 200px; height: 200px; overflow: hidden; border-radius: 15px;">
                                        <img src="${croppedImageUrl}" style="width: 100%;" class="center-cropped"; />
                                    </div> 
                                </td>`: '<td style="padding-right:20px;padding-top:10px;" >'}
                                    <td style="padding-bottom:60px; padding-top:10px;padding-right:20px; vertical-align:top;" valign="top">
                                        <table style="padding-top:40px; border-collapse: collapse;">
                                            <tbody>
                                                <tr>
                                                    <td style="text-align: center; font-weight: bold; line-height: 50px; font-size: 50px; color: #C62035; font-family: Montserrat;" min-width: 350px; id="empNameField">
                                                        <span style="border-bottom: 3px solid #B5222B; white-space: nowrap;">${name}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: center; padding-bottom:30px; padding-top:15px; line-height:15px; color:#C62035;">
                                                        <span id="empDesignationField" style="font-size:25px; font-family:Montserrat; font-weight:500; white-space: nowrap; ">${jobTitle}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-bottom: 8px; white-space: nowrap; padding-left: 2px;">
                                                        <span style="font-weight: 600;">
                                                            <img class="signature-icon" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;" src="https://i.ibb.co/k4XswKh/pngegg.png">
                                                        </span>
                                                        &nbsp;
                                                        <span id="empWhatsappField" class="v-align-offset" style="display: inline-block; vertical-align: middle;">${whatsapp}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="line-height: 0px; white-space: nowrap; padding-bottom: 10px;">
                                                        <span style="font-weight: 600;">
                                                            <img class="signature-icon" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle;" src="https://i.ibb.co/w0smpPr/smartphone.png">
                                                        </span>
                                                        &nbsp;
                                                        <span id="empMobileField" class="v-align-offset" style="display: inline-block; vertical-align: middle;">${phone}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="line-height: 0px; white-space: nowrap; padding-left: 4px; margin: 0; padding-bottom: 10px;">
                                                        <span style="font-weight: 600; color: #e70312;">
                                                            <img class="signature-icon" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;" src="${telephone}">
                                                        </span>
                                                        &nbsp;
                                                        <span id="empMobileField" class="v-align-offset" style="display: inline-block; vertical-align: middle;">${officeLandline}(24/7)</span>
                                                    </td>
                                                </tr>
                                                <tr style="margin: 0; padding: 0;">
                                                    <td style="line-height: 0px; white-space: nowrap;padding-left: 2px; margin: 0;">
                                                        <span style="font-weight: 600; color: #e70312;">
                                                            <img class="signature-icon" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle;" src="https://i.ibb.co/X8ScDq6/vecteezy-gmail-png-icon-16716465.png">
                                                        </span>
                                                        &nbsp;
                                                        <span id="empMobileField" class="v-align-offset" style="display: inline-block; vertical-align: middle;">${email}</span>
                                                    </td>
                                                </tr>

                                                
                                            </tbody>
                                        </table>
                                    </td>
                                    
                                    <td style="text-align: center;padding-top:0px;">
                                        <hr style="width: 2px;border: 0; height: 165px; background-color: #D45F6D;">
                                    </td>
                                    <td>
                                        <table style='padding-top:0px;padding-left:20px;padding-right:20px;line-height:1.6;font-size:80%;color:rgb(0,0,1)' cellspacing="0" cellpadding="0" border="0">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div style='padding-bottom:2px;font-size:14px;height:40px;'>
                                                            <span style="font-weight:600;color:#e70312"></span>
                                                            <span style="vertical-align: 0px;font-weight: 500; font-size: 18px; color: #C62035; font class="v-align-offset" id="compAddressField">${company}</span><br />
                                                            <span style="vertical-align: 0px;" class="v-align-offset" id="compAddressField">${line1}</span><br />
                                                            <span style="vertical-align: 0px;" class="v-align-offset" id="compAddressField">${line2}</span><br />
                                                            <span style="vertical-align: 0px;" class="v-align-offset" id="compAddressField">${line3}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div style="padding-top:60px;font-size:14px;">
                                                            <span style="font-weight:600;color:#e70312;">
                                                                <img class="signature-icon" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle;" src="${website}">
                                                            </span>
                                                            &nbsp;
                                                            <span style="display: inline-block; vertical-align: middle;" class="v-align-offset" id="compAddressField">
                                                                www.safiya.travel
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                     <td style="padding:25px 0px 0px">
                                                        <div style="font-weight: bold;font-size:14px;">
                                                        </div>
                                                        <img
                                                            id="compLogoField"
                                                            alt="Safiya Logo"
                                                            style="width:350px;border-radius:0%;"
                                                            src=${safiyaLogo}
                                                            width="100"
                                                            className="CToWUd"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>     
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="footer" style="background-color: #BF1E2E; color: white; margin-bottom: -1px; margin-right: -1px; text-align: center; padding: 8px;"></div>
            </div>
        </div>`;

        return signatureText;
    };

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                1500,
                1500,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

    const handlePhotoChange = async (event) => {
        const selectedFile = event.target.files[0];
        setImage(selectedFile);
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onload = (event) => {
            setImageUrl(event.target.result);
        };
        reader.readAsDataURL(selectedFile);
        const img = await resizeFile(file);
        console.log(img);
        setImageUrl(URL.createObjectURL(img));
        setCroppedImageUrl(URL.createObjectURL(img));
        setImageCropped(false);
        setIsModalOpen(true);
    };
    const handleGenerateImage = async () => {
        const signatureContainer = document.getElementById('signature-container');
        if (!signatureContainer) {
            console.error('Signature container not found');
            return;
        }

        // Ensure footer is fully visible before capturing the image
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.style.position = 'static';
            footer.style.visibility = 'visible';
        }

        // Generate the image
        html2canvas(signatureContainer, { useCORS: true }).then((canvas) => {
            canvas.toBlob((blob) => {
                // Download the image
                const tempAnchor = document.createElement('a');
                tempAnchor.href = URL.createObjectURL(blob);
                tempAnchor.download = 'signature.png';
                tempAnchor.click();
                URL.revokeObjectURL(tempAnchor.href);
                toast.success("Signature image downloaded!");

                // Copy the image to the clipboard
                const item = new ClipboardItem({ "image/png": blob });
                navigator.clipboard.write([item]).then(() => {
                    // toast.success("Signature image copied to clipboard!");
                }).catch(err => {
                    console.error('Failed to copy image to clipboard: ', err);
                    // toast.error("Failed to copy image to clipboard.");
                });

                // Reset footer styles
                if (footer) {
                    footer.style.position = '';
                    footer.style.visibility = '';
                }
            });
        }).catch(error => {
            console.error('Error generating image:', error);
            toast.error("Failed to generate signature image.");
        });
    };

    const updateCroppedImageUrl = (url) => {

        setCroppedImageUrl(url);
        setImageCropped(true);
        setIsModalOpen(false);
    };




    return (

        <div id="test" className="container">
            <h2 style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#BF1E2E",
                color: "white",
                padding: "15px 32px",
                fontSize: "20px",
                margin: "0 auto",
            }}>
                Email Signature Generator
                <button className='logout_but' onClick={() => props.logout()} style={{ marginLeft: "auto", border: "none", background: "none", color: "white", cursor: "pointer" }}>Log Out</button>
            </h2>
            <br />
            <div id="test" class="container">
                <form className="form" style={{ margin: "-10px  0px -20px 0px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <fieldset class="fieldset">
                            <legend class="form-label">Name</legend>
                            <div class="form-group">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                    className="form-input"

                                />
                            </div>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="form-label">Job Title</legend>
                            <div class="form-group">
                                <input
                                    type="text"
                                    id="jobTitle"
                                    name="jobTitle"
                                    value={jobTitle}
                                    onChange={handleInputChange}
                                    placeholder="Enter your job title"
                                    className="form-input"
                                />
                            </div>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="form-label">Phone </legend>
                            <div class="form-group">
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number (optional)"
                                    className="form-input"
                                />
                            </div>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="form-label">Whastapp Number </legend>
                            <div class="form-group">
                                <input
                                    type="text"
                                    id="whatsapp"
                                    name="whatsapp"
                                    value={whatsapp}
                                    onChange={handleInputChange}
                                    placeholder="Enter whatsapp number"
                                    className="form-input"
                                />
                            </div>
                        </fieldset>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <fieldset class="fieldset">
                            <legend class="form-label">Email </legend>
                            <div class="form-group">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email address"
                                    className="form-input"
                                />
                            </div>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="form-label">Company Name</legend>
                            <div class="form-group">
                                <input
                                    id="address"
                                    type="text"
                                    value={company}
                                    onChange={handleInputChange}
                                    placeholder='Enter Company Name'
                                    name="company"
                                    className="form-input"
                                />
                            </div>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="form-label">Office Landline </legend>
                            <div class="form-group">
                                <input
                                    type="text"
                                    id="officeLandline"
                                    name="officeLandline"
                                    value={officeLandline}
                                    onChange={handleInputChange}
                                    placeholder="Enter office Landline Number"
                                    className="form-input"
                                />
                            </div>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="form-label">Office Phone Number</legend>
                            <div class="form-group">
                                <input
                                    id="officephone"
                                    type="text"
                                    value={officePhone}
                                    onChange={handleInputChange}
                                    placeholder='Enter office Phone Number'
                                    name="officephone"
                                    className="form-input"
                                />
                            </div>
                        </fieldset>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <fieldset class="fieldset">
                            <legend class="form-label">Address Line 1</legend>
                            <div class="form-group">
                                <input
                                    id="adress"
                                    type="text"
                                    value={line1}
                                    onChange={handleInputChange}
                                    placeholder=' Address line 1'
                                    name="line1"
                                    className="form-input"
                                />
                            </div>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="form-label">Address Line 2</legend>
                            <div class="form-group">
                                <input
                                    id="address"
                                    type="text"
                                    value={line2}
                                    onChange={handleInputChange}
                                    placeholder=' Address line 2'
                                    name="line2"
                                    className="form-input"
                                />
                            </div>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="form-label">Address Line 3</legend>
                            <div class="form-group">
                                <input
                                    id="address"
                                    type="text"
                                    value={line3}
                                    onChange={handleInputChange}
                                    placeholder=' Address line 3'
                                    name="line3"
                                    className="form-input"
                                />
                            </div>
                        </fieldset>
                        <fieldset class="fieldset" >
                            <legend class="form-label">Photo </legend>
                            <div class="form-group">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="photo"
                                    name="photo"
                                    onChange={handlePhotoChange}
                                    className="form-input"
                                />
                            </div>
                        </fieldset>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    </div>

                    <br />
                </form>


                <div className='test'>
                    {/* <CopyToClipboard text={generateSignature()} onCopy={() => { copyToClip("", imageUrl);  }}> */}
                    <button
                        type="button" onClick={handleGenerateImage}
                        style={{
                            backgroundColor: "#BF1E2E",
                            border: "none",
                            color: "white",
                            padding: "15px 32px",
                            textAlign: "center",
                            fontSize: "20px",
                            margin: "0 auto",
                            display: "block",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        {'Export Signature'}
                    </button>

                    {/* </CopyToClipboard> */}
                    <ToastContainer />
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Image Cropper"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        height: '90%',
                    },
                }}
            >
                <h2>Crop Your Image</h2>
                <Cropper
                    imageUrl={imageUrl}
                    selectedImage={image}
                    updateCroppedImageUrl={updateCroppedImageUrl}
                />
                <button onClick={() => setIsModalOpen(false)}>Close</button>
            </Modal>
            <div dangerouslySetInnerHTML={{ __html: generateSignature() }}></div>
        </div>
    );
}
export default EmailSignature;
