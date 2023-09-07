from flask import Flask, render_template, request, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    video_files = [f for f in os.listdir('video') if f.endswith('.mp4')]
    video_name = request.args.get('video_name')
    if video_name is None or video_name not in video_files:
        video_name = video_files[0]  # default to the first video
    return render_template('index.html', video_files=video_files, current_video=video_name)

@app.route('/video/<filename>')
def video(filename):
    return send_from_directory('video', filename)

if __name__ == "__main__":
    app.run(debug=True)
