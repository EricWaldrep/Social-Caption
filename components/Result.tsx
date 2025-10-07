export default function Result({ data }: { data: any }) {
  if (!data) return null;
  const { captions, hashtags, hooks } = data;
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-2 text-xl font-semibold">Captions</h3>
        <ul className="space-y-2">
          <li className="rounded-xl bg-white/5 p-3">{captions?.short}</li>
          <li className="rounded-xl bg-white/5 p-3">{captions?.medium}</li>
          <li className="rounded-xl bg-white/5 p-3">{captions?.long}</li>
        </ul>
      </section>
      <section>
        <h3 className="mb-2 text-xl font-semibold">Hashtags</h3>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <div>
            <h4 className="font-medium mb-1">Primary</h4>
            <ul className="space-y-1">{hashtags?.primary?.map((t:string,i:number)=>(<li key={i} className="rounded bg-white/5 p-2">#{t.replace(/^#/,'')}</li>))}</ul>
          </div>
          <div>
            <h4 className="font-medium mb-1">Secondary</h4>
            <ul className="space-y-1">{hashtags?.secondary?.map((t:string,i:number)=>(<li key={i} className="rounded bg-white/5 p-2">#{t.replace(/^#/,'')}</li>))}</ul>
          </div>
          <div>
            <h4 className="font-medium mb-1">Experimental</h4>
            <ul className="space-y-1">{hashtags?.experimental?.map((t:string,i:number)=>(<li key={i} className="rounded bg-white/5 p-2">#{t.replace(/^#/,'')}</li>))}</ul>
          </div>
        </div>
      </section>
      <section>
        <h3 className="mb-2 text-xl font-semibold">Hooks</h3>
        <ul className="space-y-2">
          {hooks?.map((h:string,i:number)=>(<li key={i} className="rounded-xl bg-white/5 p-3">{h}</li>))}
        </ul>
      </section>
    </div>
  );
}
