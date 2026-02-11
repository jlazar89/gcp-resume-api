const { Firestore } = require('@google-cloud/firestore');
const fs = require('fs');

// Read the resume JSON file
const resumeData = JSON.parse(fs.readFileSync('./resume.json', 'utf8'));

// Initialize Firestore
const firestore = new Firestore({
  projectId: 'resume-api-project-487014',
});

async function uploadResume() {
  try {
    console.log('Uploading resume to Firestore...');
    
    // Create/update the resume document
    const resumeRef = firestore.collection('Resumes').doc(resumeData.id);
    await resumeRef.set(resumeData);
    
    console.log('✅ Resume uploaded successfully!');
    console.log(`Document ID: ${resumeData.id}`);
    
    // Verify it was uploaded
    const doc = await resumeRef.get();
    if (doc.exists) {
      console.log('✅ Verified: Resume exists in Firestore');
      console.log('Resume name:', doc.data().basics.name);
    }
  } catch (error) {
    console.error('❌ Error uploading resume:', error);
  }
}

uploadResume();
