import { Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";
import nodemailer = require('nodemailer');
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash';
import * as moment  from 'moment';

@Injectable()
export class MailService {
	transporter: any;
	constructor(
		// private mailerService: MailerService,
		private config: ConfigService
	) {
		this.init()
	}

	async init() {
		this.transporter = nodemailer.createTransport({
			host: `${this.config.get('MAIL_HOST')}`,
			secure: false,
			port: 587,
			sender: `${this.config.get('MAIL_USER')}`,
			auth: {
				user: this.config.get('MAIL_USER'),
				pass: this.config.get('MAIL_PASSWORD'),
			},
			tls: {
				rejectUnauthorized: true,
			},
		});
	}


	async sendUserConfirmation(data: any) {
		try {
			const result = await this.transporter.sendMail({
				from: `[Nội thất] ${this.config.get('MAIL_USER')}`,
				to: data.email,
				cc: ['letxhe140798@fpt.edu.vn'],
				subject: `[Nội thất] Chào mừng bạn đến với trang web`,
				html: `
			  <div style="background-color: #003375; margin: 0 auto; max-width: 600px; ">
			  <div style="padding: 10px; background-color: white;">
				  <h4 style="color: #0d6efd">Xin chào, ${data.email}</h4>
				  <p style="color: black">Chào mừng bạn đến với trang web của chúng tôi</p>
				  

				  <p>Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu bổ sung nào, 
				  xin hãy liên hệ với chúng tôi qua số Hotline <b>0987654321</b> 
				  hoặc gửi email về địa chỉ thietbi@gmail.com. Chúng tôi luôn sẵn lòng giúp đỡ bạn.</p>
				  
				  <p>Trân trọng,</p>
				  <p><b>Nội thất</b></p>
			  </div>
		  </div>
					  `,
			});
		} catch (error) {
		}
	}

	async sendOrderData(data: any) {
		try {
			console.log(moment(data?.created_at));
			const result = await this.transporter.sendMail({
				from: `[Nội thất] ${this.config.get('MAIL_USER')}`,
				to: data.email,
				cc: ['letxhe140798@fpt.edu.vn'],
				subject: `[Nội thất] Đặt hàng thành công`,
				html: `
                <div style='margin-left: 20px; font-size: 14px; overflow: auto; height: 400px; display: block;'>
                    <div style='color:#000;'>Bạn đã đặt thành công đơn hàng</div>
                    <br>
                                      
                    <div style='margin-top: 0; color:#000;'>Ngày đặt: ${
                      moment(data?.created_at).format('DD/MM/yyyy HH:mm')
                    }</div>
                    <br>
                    <div style=' color:#000;'>Tên khách hàng: ${
                      data.receiver_name
                    }</div>
                    <div style=' color:#000;'>Email: <a style='color: #007bff !important;text-decoration: none;'>${
                      data.receiver_email
                    }</a></div>
                    <div style=' color:#000;'>Phone: ${data.receiver_phone}</div>
                    <br>
                    <div style='font-weight: 700; color:#000;'>Sản phẩm</div>
                    <div style=' color:#000;'>${this.genTemplateWSOrder(
                      data.transactions
                    )}</div>
                    <br>
                    <div style='color:#000;'>Total: ${data.total_price}</div>
                </div>
                
					  `,
			});
			console.log(result);
		} catch (error) {
			console.log("error mail", error);
		}
	}

	genTemplateWSOrder(products: any) {
		let text = '';
		if (!_.isEmpty(products)) {
		  products.forEach((item: any) => {
			let type = '';
			if (item.type == 2) type = '[Sample] ';
			text +=
			  item.quantity + ' x ' + type + item.name + ' ' + item.price + '<br>';
		  });
		}
		return text;
	  }
}
