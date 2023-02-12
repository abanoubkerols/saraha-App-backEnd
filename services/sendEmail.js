import nodeoutlook from 'nodejs-nodemailer-outlook'


export function myEmail(dest, message) {


    nodeoutlook.sendEmail({
        auth: {
            user: "RouteSat11@outlook.com",
            pass: "1478530123Mm"
        },
        from: 'RouteSat11@outlook.com',
        to: dest,
        subject: 'Hey you, awesome!',
        html: message,
        text: 'This is text version!',

        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    }
    );
}