import { faker } from '@faker-js/faker'
import { recurse } from 'cypress-recurse'

export type TempMailEmailsResponse = {
  count: number
  first_id: number
  last_id: number
  limit: number
  mail_list: MailListItem[]
  more: boolean
  result: boolean
}

export type MailListItem = {
  attachment_count: number
  first_attachment_name: string
  from_mail: string
  from_name: string
  is_new: boolean
  mail_id: number
  subject: string
  time: string
}

export type TempMailEmailContent = {
  attachments: []
  date: string
  from: string
  from_is_local: boolean
  from_mail: string
  from_name: string
  html: string
  is_tls: boolean
  mail_id: number
  message_id: string
  result: boolean
  subject: string
  text: string
  to: string
}

export const getRandomTempMail = () => {
  return faker.internet.userName() + '@mailto.plus'
}

export const getEmails = (email: string, limit = 10) => {
  return cy
    .request<TempMailEmailsResponse>({
      method: 'GET',
      url: `https://tempmail.plus/api/mails?email=${encodeURIComponent(
        email,
      )}&limit=${limit}&epin=`,
    })
    .then((res) => res.body)
}

export const getEmailContent = (
  emailId: MailListItem['mail_id'],
  email: string,
) => {
  return cy
    .request<TempMailEmailContent>({
      method: 'GET',
      url: `https://tempmail.plus/api/mails/${emailId}?email=${encodeURIComponent(
        email,
      )}`,
    })
    .then((res) => res.body)
}

export const deleteEmails = (email: string) => {
  return getEmails(email, 1).then((res) => {
    return cy.request({
      method: 'DELETE',
      url: `https://tempmail.plus/api/mails?email=${encodeURIComponent(
        email,
      )}&first_id=${res.first_id}`,
    })
  })
}

export const getContentFromEmail = (email: string, messageNumber: number) => {
  return recurse(
    () => getEmails(email),
    (emails: TempMailEmailsResponse) => emails.count > messageNumber,
  ).then((tempEmailsRes) => {
    const emailInfo = tempEmailsRes.mail_list[0]
    return getEmailContent(emailInfo.mail_id, email)
  })
}

export const getEmailCode = (email: string) => {
  return getContentFromEmail(email, 0)
    .then((emailContent) => {
      const code = emailContent.html.match(/<strong>(.*?)<\/strong>/)
      return code[1]
    })
    .then((code) => {
      console.log(code)
      return code
    })
}
