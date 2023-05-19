// Email Validation
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        throw {
          message: MESSAGES.USERS.EMAIL_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
        };
      }