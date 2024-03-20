import cv2
import numpy as np
import mediapipe as mp
from tensorflow.keras.models import load_model
import streamlit as st

mpHands = mp.solutions.hands
hands = mpHands.Hands(max_num_hands=1, min_detection_confidence=0.7)
mpDraw = mp.solutions.drawing_utils

model = load_model('model')

f = open('gesture.names', 'r')
classNames = f.read().split('\n')
f.close()

def process_frame(frame):
    x, y, c = frame.shape
    frame = cv2.flip(frame, 1)
    framergb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = hands.process(framergb)
    className = ''

    if result.multi_hand_landmarks:
        landmarks = []
        for handslms in result.multi_hand_landmarks:
            for lm in handslms.landmark:
                lmx = int(lm.x * x)
                lmy = int(lm.y * y)
                landmarks.append([lmx, lmy])

            mpDraw.draw_landmarks(frame, handslms, mpHands.HAND_CONNECTIONS)
            prediction = model.predict([landmarks])
            classID = np.argmax(prediction)
            className = classNames[classID]
        cv2.putText(frame, className, (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2, cv2.LINE_AA)
    return className, frame


cap = cv2.VideoCapture(0)


st.sidebar.header('MumPy Workshop')
option = st.sidebar.selectbox('Select Model', ('Hand Gesture Recognition', 'Object Segmentation YOLO', 'Object Detection YOLO'))
if option=="Hand Gesture Recognition":
    st.title("Hand Gesture Recognition")
    image_placeholder = st.empty()
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            st.error("Failed to capture video.")
            break
        className, processed_frame = process_frame(frame)
        image_placeholder.image(processed_frame, channels="BGR", use_column_width=True)
elif option=="Object Segmentation YOLO":
    st.title("Object Segmentation YOLO")
    st.markdown("This app uses YOLO to segment objects in the frame.")
    st.markdown("This feature is coming soon!")
elif option=="Object Detection YOLO":
    st.title("Object Detection YOLO")
    st.markdown("This app uses YOLO to detect objects in the frame.")
    st.markdown("This feature is coming soon!")