from flask import Flask, render_template

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/sitea.html')
def site_a():
    return render_template('sitea.html')

@app.route('/siteb.html')
def site_b():
    return render_template('siteb.html')

@app.route('/sitec.html')
def site_c():
    return render_template('sitec.html')

if __name__ == '__main__':
    app.run(debug=True)
