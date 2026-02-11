const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore();

/**
 * HTTP Cloud Function to fetch resume data
 * @param {Object} req - Cloud Function request object
 * @param {Object} res - Cloud Function response object
 */
exports.getResume = async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    // Get resume ID from query parameter or use default
    const resumeId = req.query.id || 'resume-001';

    console.log(`Fetching resume with ID: ${resumeId}`);

    // Fetch resume from Firestore
    const resumeRef = firestore.collection('Resumes').doc(resumeId);
    const doc = await resumeRef.get();

    if (!doc.exists) {
      res.status(404).json({
        error: 'Resume not found',
        message: `No resume found with ID: ${resumeId}`
      });
      return;
    }

    // Return resume data
    const resumeData = doc.data();
    res.status(200).json(resumeData);
    
    console.log(`Successfully returned resume for: ${resumeData.basics.name}`);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
