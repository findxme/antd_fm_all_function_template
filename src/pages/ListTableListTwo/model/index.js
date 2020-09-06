
export default function(Arbiter) {
    const initState = () => {
        const evts = {
            onQuery: (a) => {
                alert("123"+a)
            },
            onChange:(e)=>{
                Arbiter.publish('whetherImportRevenue', { }, { nameSpace: "book.scheme" }).then((data)=>{
                    alert("123"+data+ e.target.value)
                }),                  
                console.log('radio checked', e.target.value)
                const value =e.target.value
                const { tools } = this.state;
                this.setState({tools: {...tools, value}});
            }
        }
        const tools = { evts };
        this.setState({tools});
    }

    this.setState({loading: true},initState);

}