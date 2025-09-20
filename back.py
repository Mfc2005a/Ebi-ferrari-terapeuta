from flask import Flask, render_template, request, jsonify, redirect, url_for
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'

# Dados simulados para depoimentos
testimonials = [
    {
        "name": "Maria Silva",
        "text": "A terapia mudou completamente minha perspectiva de vida. Sou muito grata pelo acolhimento e profissionalismo.",
        "rating": 5
    },
    {
        "name": "João Santos",
        "text": "Encontrei um espaço seguro para trabalhar minhas questões. Recomendo de coração.",
        "rating": 5
    },
    {
        "name": "Ana Costa",
        "text": "Profissional excepcional, com uma abordagem humanizada e eficaz. Muito obrigada!",
        "rating": 5
    }
]

# Dados dos serviços
services = [
    {
        "title": "Terapia Individual",
        "description": "Sessões personalizadas para trabalhar questões específicas e promover autoconhecimento.",
        "duration": "50 minutos",
        "price": "R$ 150"
    },
    {
        "title": "Terapia de Casal",
        "description": "Acompanhamento especializado para fortalecer relacionamentos e melhorar a comunicação.",
        "duration": "60 minutos", 
        "price": "R$ 200"
    },
    {
        "title": "Terapia Familiar",
        "description": "Trabalho terapêutico focado na dinâmica familiar e resolução de conflitos.",
        "duration": "60 minutos",
        "price": "R$ 180"
    },
    {
        "title": "Orientação Vocacional",
        "description": "Processo de autoconhecimento para escolhas profissionais e de carreira.",
        "duration": "45 minutos",
        "price": "R$ 120"
    }
]

@app.route('/')
def index():
    return render_template('index.html', testimonials=testimonials, services=services)

@app.route('/contact', methods=['POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        message = request.form.get('message')
        
        # Aqui você pode processar os dados do formulário
        # Por exemplo, enviar email, salvar no banco de dados, etc.
        
        return jsonify({
            'status': 'success',
            'message': 'Mensagem enviada com sucesso! Entrarei em contato em breve.'
        })
    
    return redirect(url_for('index'))

@app.route('/schedule')
def schedule():
    # Redireciona para WhatsApp para agendamento
    whatsapp_number = "5511999999999"  # Substitua pelo número real
    message = "Olá! Gostaria de agendar uma sessão de terapia."
    whatsapp_url = f"https://wa.me/{whatsapp_number}?text={message}"
    return redirect(whatsapp_url)

if __name__ == '__main__':
    app.run(debug=True)
