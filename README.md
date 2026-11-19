# **LUXIF**

Projeto integrador do 2º semestre de Engenharia de Computação do Instituto Federal de São Paulo, câmpus Guarulhos.

Integrantes:
* Eduardo Luciano Martinez
* Emily Oliveira Araujo
* Henrique Ferreira Defavere
* Rafael Shiguemi Usui Ramos
* Vinícius Martins Pereira

---

# Descrição do Projeto
O LUXIF é um luxímetro de baixo custo feito com um LDR e um Arduino Uno. O LDR forma um divisor de tensão com um entre quatro resistores de referência (1 kΩ, 10 kΩ, 100 kΩ e 470 kΩ), escolhido automaticamente pelo Arduino para medir bem tanto na penumbra quanto em ambientes claros. A faixa em uso é indicada por LEDs azuis e a leitura em lux aparece num display OLED.

# Estrutura do Repositório
```
luxif
|- README.md            # Apresenta o projeto
|- index.html           # Página principal do site
|- paginas/             # Para as páginas secundárias (inclui o guia de montagem)
|- css/                 # Para os arquivos de estilização
|- imagens/             # Para as imagens usadas no site
|- js/                  # Para os scripts do site (tema e conexão com o LUXIF)
|- icones/              # Para os ícones do site
|- codigo/
|   |- luxif/           # Código para o Arduino Uno
|   |- luxif_wifi/      # Versão com Wi-Fi, para o ESP32
|- documento/           # Artigo sobre o hardware (PDF)
|   |- latex/           # Código-fonte do artigo em LaTeX
```