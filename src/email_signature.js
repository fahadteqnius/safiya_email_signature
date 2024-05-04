import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import MailTemplate from './mail_template';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/firebase';



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

    const [copied, setCopied] = useState(false);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);


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


    function copyToClip(htmlContent, imageDataURL) {

        let signatureText = `
        <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
        <style>
        </style>
        </head>
        <body>
        <div class="col-7">
            <div class="card" align:center;>
                <div class="card-body">
                    <div id="signature-container">
                        <table width="600" cellspacing="0" ; cellpadding="0" border="0">
                            <tbody>
                                <tr >
                                ${image ? `
                                    <td style="padding-right:50px;padding-top:10px;" >
                                    <div style="width: 200px; height: 210px; overflow: hidden; border-radius: 15px;">
                                        <img src="${imageDataURL}" style="width: 100%;" />
                                    </div>
                                    </td>`: ''}
                                    <td style="padding-bottom:60px; padding-top:100px;padding-right:20px; vertical-align:top;" valign="top">
                                        <table style="width: 400px;">
                                            <tbody>
                                            <tr>
                                                    <td style="text-align: center; font-weight: bold; line-height: 50px; font-size: 50px; color: #030303; font-family: Montserrat;" id="empNameField">
                                                        <span style="border-bottom: 3px solid #B5222B; white-space: nowrap;">${name}</span>
                                                    </td>
                                                </tr>
                                          <tr>
                                            <td style="text-align: center; padding-bottom:30px; padding-top:15px; line-height:15px; color:#B5222B;">
                                              <span id="empDesignationField" style="font-size:25px;font-family:Montserrat;font-weight:500">${jobTitle}</span>
                                            </td>
                                          </tr>
                                                <tr>
                                                    <td>
                                                        <span style="font-weight:600;">
                                                            <img class="signature-icon" style="width: 16px; height: 16px;" src="https://i.ibb.co/q5JV658/whatsapp.png">
                                                        </span>
                                                        &nbsp;
                                                        <span id="empWhatsappField" style="vertical-align: 4px;" class="v-align-offset">${whatsapp}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="line-height:0px;"    >
                                                        <span style="font-weight:600;">
                                                            <img class="signature-icon" style="color:#B5222B;width: 16px; height: 16px;" src="https://i.ibb.co/3sRHm5Y/smartphone-1.png">
                                                        </span>
                                                        &nbsp;
                                                        <span id="empMobileField" style="vertical-align: 4px;" class="v-align-offset">${phone}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div style='padding-bottom:2px;font-size:14px;'>
                                                            <span style="font-weight:600;color:#e70312">
                                                                <img class="signature-icon" style="width: 16px; height: 16px;" src="https://i.ibb.co/d54nnvM/email-1.png">
                                                            </span>
                                                            &nbsp;
                                                            <a id="empMailField" style="color:black;vertical-align: 4px;" class="v-align-offset" href="mailto:${email}" target="_blank">${email}</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td style="text-align: center;padding-top:40px;">
                                        <hr style="width: 2px;border: 0; height: 165px; background-color: #D45F6D;">
                                    </td>
                                    <td>
                                        <table style='width:500px;padding-top:35px;padding-left:50px;padding-right:0px;line-height:1.4;font-size:80%;color:rgb(0,0,1)' cellspacing="0" cellpadding="0" border="0">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div style='padding-bottom:2px;font-size:14px;line-height:35px;'>
                                                            <span style="font-weight:600;color:#e70312">  <img class="signature-icon" style="width: 16px; height: 16px;" src="https://i.ibb.co/9ZmMqfV/24-7.png"></span>&nbsp;<span id="empMobileField" style="vertical-align: 4px;" class="v-align-offset">${officeLandline}(24/7)</span>
                                                            &nbsp;<span style="font-weight:600;color:#e70312">  <img class="signature-icon" style="width: 16px; height: 16px;" src="https://i.ibb.co/LR0sXtB/call.png"></span>&nbsp;<span id="empMobileField" style="vertical-align: 4px;" class="v-align-offset">${officePhone}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>    
                                                        <div style='padding-bottom:2px;font-size:14px;height:40px;'>
                                                            <span style="font-weight:600;color:#e70312"></span>
                                                            <span style="vertical-align: 0px;" class="v-align-offset" id="compAddressField">${company}</span><br />
                                                            <span style="vertical-align: 0px;" class="v-align-offset" id="compAddressField">${line1}</span><br />
                                                            <span style="vertical-align: 0px;" class="v-align-offset" id="compAddressField">${line2}</span><br />
                                                            <span style="vertical-align: 0px;" class="v-align-offset" id="compAddressField">${line3}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div style='padding-top:35px;font-size:14px;;'><span style="font-weight:600;color:#e70312"></span><span style="vertical-align: 4px;" class="v-align-offset" id="compAddressField">www.safiya.travel</span></div>
                                                    </td>
                                                    
                                                </tr>
                                                <tr>
                                                    <td style="padding:10px 0px 0px">
                                                        <div style="font-weight: bold;font-size:14px;">
                                                        </div>
                                                        <img id="compLogoField" alt="Safiya Logo" style="width:350px;border-radius:0%;" src="https://i.ibb.co/wRtV6p4/logo.png" width="100" class="CToWUd" />
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
                <div class="footer" style="background-color: #BF1E2E; color: white; text-align: center; padding: 8px;"></div>
            </div>
        </div>`;

        function listener(e) {
            e.clipboardData.setData("text/html", signatureText);
            e.clipboardData.setData("text/plain", signatureText);
            e.preventDefault();
        }

        document.addEventListener("copy", listener);
        document.execCommand("copy");
        document.removeEventListener("copy", listener);
    };


    const generateSignature = () => {
        let signatureText = `
        <div class="col-7" >
            <div class="card" align:center; >
                <div class="card-body">
                    <div id="signature-container">
                        <table width="600" cellspacing="0" ; cellpadding="0" border="0">
                            <tbody>
                                <tr >
                                ${image ? `
                                <td style="padding-right:50px;padding-top:10px;" >
                                    <div style="width: 200px; height: 210px; overflow: hidden; border-radius: 15px;">
                                        <img src="${image ? URL.createObjectURL(image) : ''}" style="width: 100%;" />
                                    </div> 
                                </td>`: ''}
                                    <td style="padding-bottom:60px; padding-top:100px;padding-right:20px; vertical-align:top;" valign="top">
                                        <table style="width: 400px;">
                                            <tbody>
                                                <tr>
                                                    <td style="text-align: center; font-weight: bold; line-height: 50px; font-size: 50px; color: #030303; font-family: Montserrat;" id="empNameField">
                                                        <span style="border-bottom: 3px solid #B5222B; white-space: nowrap;">${name}</span>
                                                    </td>
                                                </tr>
                                          <tr>
                                            <td style="text-align: center; padding-bottom:30px; padding-top:15px; line-height:15px; color:#D45F6D;">
                                              <span id="empDesignationField" style="font-size:25px;font-family:Montserrat;font-weight:500">${jobTitle}</span>
                                            </td>
                                          </tr>
                                          
                                               
                                                <tr>
                                                    <td>
                                                        <span style="font-weight:600;">
                                                            <img class="signature-icon" style="width: 16px; height: 16px;" src="https://i.ibb.co/q5JV658/whatsapp.png">
                                                        </span>
                                                        &nbsp;
                                                        <span id="empWhatsappField" style="vertical-align: 4px;fontFamily: 'Poppins, sans-serif';" class="v-align-offset">${whatsapp}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="line-height:0px;">
                                                        <span style="font-weight:600;">
                                                            <img class="signature-icon" style="color:#B5222B;width: 16px; height: 16px;" src="https://i.ibb.co/3sRHm5Y/smartphone-1.png">
                                                        </span>
                                                        &nbsp;
                                                        <span id="empMobileField" style="vertical-align: 4px;" class="v-align-offset">${phone}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div style='padding-bottom:2px;font-size:14px;'>
                                                            <span style="font-weight:600;color:#e70312">
                                                                <img class="signature-icon" style="width: 16px; height: 16px;" src="https://i.ibb.co/d54nnvM/email-1.png">
                                                            </span>
                                                            &nbsp;
                                                            <a id="empMailField" style="color:black;vertical-align: 4px;" class="v-align-offset" href="mailto:${email}" target="_blank">${email}</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    
                                    <td style="text-align: center;padding-top:40px;">
                                        <hr style="width: 2px;border: 0; height: 165px; background-color: #D45F6D;">
                                    </td>
                                    <td>
                                        <table style='width:500px;padding-top:35px;padding-left:50px;padding-right:0px;line-height:1.4;font-size:80%;color:rgb(0,0,1)' cellspacing="0" cellpadding="0" border="0">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div style='padding-bottom:2px;font-size:14px;line-height:35px;'>
                                                            <span style="font-weight:600;color:#e70312">  <img class="signature-icon" style="width: 16px; height: 16px;" src="https://i.ibb.co/9ZmMqfV/24-7.png"></span>&nbsp;<span id="empMobileField" style="vertical-align: 4px;" class="v-align-offset">${officeLandline}(24/7)</span>
                                                            &nbsp;<span style="font-weight:600;color:#e70312">  <img class="signature-icon" style="width: 16px; height: 16px;" src="https://i.ibb.co/LR0sXtB/call.png"></span>&nbsp;<span id="empMobileField" style="vertical-align: 4px;" class="v-align-offset">${officePhone}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div style='padding-bottom:2px;font-size:14px;height:40px;'>
                                                            <span style="font-weight:600;color:#e70312"></span>
                                                            <span style="vertical-align: 0px; class="v-align-offset" id="compAddressField">${company}</span><br />
                                                            <span style="vertical-align: 0px;" class="v-align-offset" id="compAddressField">${line1}</span><br />
                                                            <span style="vertical-align: 0px;" class="v-align-offset" id="compAddressField">${line2}</span><br />
                                                            <span style="vertical-align: 0px;" class="v-align-offset" id="compAddressField">${line3}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div style='padding-top:40px;font-size:14px;'><span style="font-weight:600;color:#e70312"></span><span style="vertical-align: 4px;" class="v-align-offset" id="compAddressField">www.safiya.travel</span></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:10px 0px 0px">
                                                        <div style="font-weight: bold;font-size:14px;">
                                                        </div>
                                                        <img id="compLogoField" alt="Safiya Logo" style="width:350px;border-radius:0%;" src="https://i.ibb.co/wRtV6p4/logo.png" width="100" class="CToWUd" />
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
                <div class="footer" style="background-color: #BF1E2E; color: white; text-align: center; padding: 8px;"></div>
            </div>
        </div>`;

        return signatureText;
    };

    const handlePhotoChange = (event) => {
        const selectedFile = event.target.files[0];
        setImage(selectedFile);
        const reader = new FileReader();
        reader.onload = (event) => {
            setImageUrl(event.target.result);
        };
        reader.readAsDataURL(selectedFile);
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
                    <CopyToClipboard text={generateSignature()} onCopy={() => { copyToClip("", imageUrl); toast.success("Signature copied to clipboard!"); }}>
                        <button
                            type="button"
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
                            }}
                        >
                            {'Copy to Clipboard'}
                        </button>
                    </CopyToClipboard>
                    <ToastContainer />
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: generateSignature() }}></div>
        </div>
    );
}
export default EmailSignature;
