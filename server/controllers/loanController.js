const Loan = require('../models/Loan');

const formatLoan = (loan) => ({
  id: loan._id || loan.id,
  userId: loan.userId,
  personalDetails: loan.personalDetails,
  employment: loan.employment,
  income: loan.income,
  documents: loan.documents,
  loanAmount: loan.loanAmount,
  tenure: loan.tenure,
  status: loan.status,
  createdAt: loan.createdAt,
  updatedAt: loan.updatedAt
});

// POST /api/loan/apply
exports.apply = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { personalDetails, employment, income, documents, loanAmount, tenure } = req.body;

    if (loanAmount !== undefined && loanAmount <= 0) {
      return res.status(400).json({ success: false, message: 'loanAmount must be a positive number' });
    }
    if (tenure !== undefined && tenure <= 0) {
      return res.status(400).json({ success: false, message: 'tenure must be a positive number' });
    }
    if (income?.monthlyIncome !== undefined && income.monthlyIncome < 0) {
      return res.status(400).json({ success: false, message: 'monthlyIncome must be a positive number' });
    }

    const loan = await Loan.create({
      userId,
      personalDetails: personalDetails || {},
      employment: employment || {},
      income: income || {},
      documents: documents || {},
      loanAmount: loanAmount || 0,
      tenure: tenure || 12,
      status: 'Draft'
    });

    return res.status(201).json({
      success: true,
      data: {
        loan: formatLoan(loan)
      }
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/loan/update
exports.update = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { loanId, id, personalDetails, employment, income, documents, loanAmount, tenure, submit } = req.body;
    const targetLoanId = loanId || id;

    if (!targetLoanId) {
      return res.status(400).json({ success: false, message: 'loanId is required' });
    }

    const loan = await Loan.findById(targetLoanId);
    if (!loan) {
      return res.status(404).json({ success: false, message: 'Loan application not found' });
    }

    if (loan.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to loan application' });
    }

    if (loan.status !== 'Draft') {
      return res.status(403).json({ success: false, message: `Cannot modify a loan application with status '${loan.status}'` });
    }

    if (loanAmount !== undefined && loanAmount <= 0) {
      return res.status(400).json({ success: false, message: 'loanAmount must be a positive number' });
    }
    if (tenure !== undefined && tenure <= 0) {
      return res.status(400).json({ success: false, message: 'tenure must be a positive number' });
    }

    // Partial updates preserving existing nested fields
    if (personalDetails) {
      loan.personalDetails = { ...loan.personalDetails.toObject(), ...personalDetails };
    }
    if (employment) {
      loan.employment = { ...loan.employment.toObject(), ...employment };
    }
    if (income) {
      loan.income = { ...loan.income.toObject(), ...income };
    }
    if (documents) {
      loan.documents = { ...loan.documents.toObject(), ...documents };
    }
    if (loanAmount !== undefined) {
      loan.loanAmount = loanAmount;
    }
    if (tenure !== undefined) {
      loan.tenure = tenure;
    }

    // Handle Submission Action
    if (submit === true) {
      if (!loan.loanAmount || loan.loanAmount <= 0) {
        return res.status(400).json({ success: false, message: 'Valid loanAmount is required before submission' });
      }
      if (!loan.tenure || loan.tenure <= 0) {
        return res.status(400).json({ success: false, message: 'Valid tenure is required before submission' });
      }
      if (!loan.personalDetails?.fullName || !loan.personalDetails?.phone) {
        return res.status(400).json({ success: false, message: 'Required personal information must be provided before submission' });
      }
      if (!loan.income?.monthlyIncome || loan.income.monthlyIncome <= 0) {
        return res.status(400).json({ success: false, message: 'Required employment/income information must be provided before submission' });
      }

      loan.status = 'Submitted';
    }

    await loan.save();

    return res.json({
      success: true,
      data: {
        loan: formatLoan(loan)
      }
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/loan/status
exports.getStatus = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const loan = await Loan.findOne({ userId }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: {
        loan: loan ? formatLoan(loan) : null
      }
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/loan/
exports.getLoans = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const loans = await Loan.find({ userId }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: {
        loans: loans.map(formatLoan)
      }
    });
  } catch (err) {
    next(err);
  }
};
