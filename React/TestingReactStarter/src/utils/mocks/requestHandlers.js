import { rest } from "msw";

export const handlers = [
  //get Contact by id
  rest.get(
    "http://contactlist.us-east-1.elasticbeanstalk.com/contact/:id",
    (req, res, ctx) => {
      const contactId = req.params;
      return res(
        ctx.status(200),
        ctx.json({
          contactId: contactId,
          firstName: "Betty",
          lastName: "Holberton",
          company: "ENIAC",
          phone: "4006670180",
          email: "BetHol@gmail.com",
        })
      );
    }
  ),

  rest.put(
    "http://contactlist.us-east-1.elasticbeanstalk.com/contact/:id",
    (req, res, ctx) => {
      const updatedContact = req.body;
      return res(ctx.status(200), ctx.json(updatedContact));
    }
  ),
];
